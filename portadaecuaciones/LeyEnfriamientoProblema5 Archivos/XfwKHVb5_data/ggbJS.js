/*global $, jQuery, console, alert, GGB_general*/


window.GGB_general = (function($) {
    "use strict";

    var isMenuVisible;
    var activePopUpElement;
    var prevLeft = 0;
    var prevWidth = 0;

    var tabletWidth = 800;
    var phoneWidth = 480;

    function isTablet() {
        return window.innerWidth <= tabletWidth;
    }
    function isPhone() {
        return window.innerWidth <= phoneWidth;
    }

    $(window).resize(function() {
        // if phone (= window < tabletWidth px) hide navi and show button to show navi
        if (isTablet()) {
            showMenuBtn(true);
        } else {
            showMenuBtn(false);
        }

        // for displaying the footer on correct position
        resizeFooter();
    });

    /**
     * This function makes the menu in the footer visible at the correct position on mobile phones,
     * when the page content is very little
     */
    function resizeFooter() {
        var ggbFooterMenuHeight;

        // if phone (= window < tabletWidth px)
        if (isTablet()) {
            ggbFooterMenuHeight = $("#ggbFooterMenu").height() + 14;

        } else {
            ggbFooterMenuHeight = $("#ggbFooterMenu>li>a").height() + 24;
        }
        $("#ggbFooter").css("margin-top", - ggbFooterMenuHeight + "px");
        $("#ggbFooterPlaceholder").css("height", ggbFooterMenuHeight + "px");
    }

    /**
     * Hides and shows the hide-show-menu button (three bars)
     * This need to be in javascript because media only screen doesn't work in IE
     * @param visible
     */
    function showMenuBtn(visible) {
        if(visible) {
            $("#ggbShowMenuBtn").show();
        }
        else {
            $("#ggbShowMenuBtn").hide();
        }
    }

    /**
     * This function initializes the menu show/hide button for phones
     */
    function initSetMenuVisibleButton() {
        $("#ggbShowMenuBtn").on("click", function() {
            setMenuVisible(!isMenuVisible);
        });
    }

    function initMaterialLanes() {
        $('.materialLane').each(function () {
            var numElements = $(this).find(".jItem").length;
            var widthElements = $(this).find(".object-container").outerWidth();
            $(this).find('.swipeable').find('.object-grid').css("width", (numElements * widthElements) + "px");

            var container = $(this).find('.materialLane-container');

            //if (numElements > 1 && (container[0].scrollWidth > container.innerWidth())) {
            if (numElements > 1 && (container.innerWidth() + 12) < numElements * widthElements) {
                $(this).find('.j-showMore').show();
            } else {
                $(this).find('.j-showMore').hide();
            }
        });
    }

    /**
     * Calculates if more button is visible. Called each time, a material is added to a post.
     * Thus we do it only for this lane, and not all of them.
     * @param lane
     */
    function initMaterialLane(lane) {
        var numElements = lane.find(".jItem").length;
        var widthElements = lane.find(".object-container").outerWidth();
        lane.find('.swipeable').find('.object-grid').css("width", (numElements * widthElements) + "px");

        var container = lane.find('.materialLane-container');

        if (numElements > 1 && (container.innerWidth() + 12) < numElements * widthElements) {
            lane.find('.j-showMore').show();
        } else {
            lane.find('.j-showMore').hide();
        }
    }

    function toggleMaterialLane(lane, visible) {
        if(visible) {
            if(lane.find('.j-showMore').is(':visible')) {
                lane.find('.materialLane-container').addClass('expanded');
                lane.find('.j-showMore').hide();
                lane.find('.j-showLess').show();
            }
        }
        else {
            if(lane.find('.j-showLess').is(':visible')) {
                lane.find('.materialLane-container').removeClass('expanded');
                lane.find('.materialLane-btnBar-top .j-showLess').hide();
                lane.find('.j-showMore').show();
            }
        }
    }

    /**
     * Hides and shows the menu on mobile devices
     * @param visible
     */
    function setMenuVisible(visible) {
        if(visible) {
            $("#ggbNavigation").slideDown();
            $("#ggbSubHeader").slideDown();
            isMenuVisible = true;
        } else {
            $("#ggbNavigation").slideUp();
            $("#ggbSubHeader").slideUp();
            isMenuVisible = false;
        }
    }

    /**
     * Opens popup
     * for now it is only the popup for the user
     * @param popup
     * @param visible
     */
    function showPopup(popup, visible) {
        if(visible) {
            $(popup).fadeIn("fast");
        } else {
            $(popup).fadeOut("fast");
        }
    }

    /**
     * Initializes the #1, #2 and #3 button to show the different banners on the startpage
     */
    function initShowLoveBannerButtons() {
        $(".showStudentsLoveBannerBtn").on("click", function() {
            showLoveBanner($("#studentsLoveBanner"), true);
        });
        $(".showTeachersLoveBannerBtn").on("click", function() {
            showLoveBanner($("#teachersLoveBanner"), true);
        });
        $(".showSchoolsLoveBannerBtn").on("click", function() {
            showLoveBanner($("#schoolsLoveBanner"), true);
        });
    }

    /**
     * Shows Student, teacher or schools banner on startpage
     * @param banner
     * @param visible
     */
    function showLoveBanner(banner, visible) {
        $(".loveBanners .ggbBanner").slideUp('fast');

        if(visible && banner.is(':visible')) {
            banner.slideUp('fast');
        } else if (visible && banner.is(':hidden')) {
            banner.slideDown('fast');

            scrollToElement(".loveBanners", 800);
        }
    }

    function initScrollButtons() {
        $(".scrollTablets").on("click", function () {
            scrollToElement('.tablets', 400);
        });
        $(".scrollDesktops").on("click", function () {
            scrollToElement('.desktops', 800);
        });
    }

    function scrollToElement(element, speed) {
        $('html, body').animate({
            scrollTop: $(element).offset().top
        }, speed);
    }

    /**
     * Initializes the buttons for the banners on the startpage
     * they are for navigating through the different pictures
     */
    function initRotateBannerButtons() {
        $(".navigate.prev").on("click", function() {
            rotateBanner($(this).closest(".slide"), "prev");
        });
        $(".navigate.next").on("click", function() {
            rotateBanner($(this).closest(".slide"), "next");
        });
    }

    /**
     * Rotates banner on landingpage in a specific direction
     * @param direction
     */
    function rotateBanner(banner, direction) {
        var currentVisible = banner.children(".visible");
        currentVisible.hide();
        currentVisible.removeClass("visible");

        if(direction == "next") {
            if(currentVisible.next().hasClass("box")) {
                currentVisible.next().fadeIn();
                currentVisible.next().addClass("visible");
            } else {
                banner.children(".box").first().fadeIn();
                banner.children(".box").first().addClass("visible");
            }
        } else {
            if(currentVisible.prev().hasClass("box")) {
                currentVisible.prev().fadeIn();
                currentVisible.prev().addClass("visible");
            } else {
                banner.children(".box").last().fadeIn();
                banner.children(".box").last().addClass("visible");
            }
        }
    }

    function initMoreInfoButtons() {
        /*$(".showMore").on("click", function() {
         showElement($(this).closest('.showHideBox').find('.showThis'), true);
         $(this).hide();
         $(this).siblings('.showLess').fadeIn();
         });
         $(".showLess").on("click", function() {
         showElement($(this).closest('.showHideBox').find('.showThis'), false);
         $(this).hide();
         $(this).siblings('.showMore').fadeIn();
         });*/
        $(".showHideBox .ggbColorHeading").on("click", function() {
            $(this).siblings('.showThis').slideToggle();
            $(this).find('.showMore').toggle();
            $(this).find('.showLess').toggle();
        });
    }

    function showElement(element, visible) {
        if(visible) {
            element.slideDown();
        } else {
            element.slideUp();
        }
    }

    function initShowTranslatorsPopup() {
        $(".translators.heading").on("click", function() {
            if($(this).find(".ggbTranslatorsPopup").is(':visible')) {
                showPopup($(this).find(".ggbTranslatorsPopup"), false);
            } else {
                showPopup($(".ggbTranslatorsPopup"), false);
                showPopup($(this).find(".ggbTranslatorsPopup"), true);
            }
        });
    }

    /*
     * Docu: https://docs.google.com/document/d/1h-2G1Ll09EUYAbfykuPWxpUIX3lZSlb6r0z_ovSh3wI/edit?ts=567954ea#
     */
    function initPopupMenus() {

        // Moved this to initHandlers() as it's not initializing everytime but just once

    }

    function initHandlers() {
        $("body").click(function(e) {
            /**
             * Closes the active popup when clicked anywhere on the body,
             * except on the place where the popup should open
             */
            var cl_popup = $(".jTmpPopup");

            if ((cl_popup.children().has(e.target).length === 0) && !$(e.target).closest("a").is(activePopUpElement)) {
                cl_popup.empty();
                cl_popup.remove();
                activePopUpElement = null;
            }

            $(".submenu-popup-container .submenu-popup, .submenu-popup-container .ggbSubmenuPopup").each(function(i, popup) {
                if (popup !== e.target && $(popup).has(e.target).length === 0 && $(popup).siblings().filter(e.target).length === 0 && $(popup).siblings().has(e.target).length === 0) {
                    $(popup).hide();
                }
            });

            var ex;
            if ((ex = $(e.target).closest(".submenu-popup-container .submenu-toggle-btn")).length > 0) {
                if (!ex.hasClass("jRenderOutside")) {

                    var popup = ex.parents('.submenu-popup-container').find(".ggbSubmenuPopup, .submenu-popup");

                    // Close all other popups
                    $(".submenu-popup-container .submenu-popup, .submenu-popup-container .ggbSubmenuPopup").not(popup).hide();

                    // close submenu popups if there are some
                    var subPopupMenus = $('.submenu-popup-container').find('.submenu-content li.has-submenu').not(popup);
                    if (subPopupMenus.size() > 0) {
                        subPopupMenus.find('.submenu-content').hide();
                        subPopupMenus.children('a').removeClass('active');
                    }

                    // Hide it ...
                    popup.css('visibility', 'hidden');

                    // Display it (hidden) ...
                    popup.toggle();

                    // Calculate overlapping of window to decide wether to show it upwards or downwards
                    var topStart = ex.offset().top;
                    var bottomStart = topStart + ex.outerHeight(true);
                    var popupHeight = $(popup.find('ul.submenu-content')).outerHeight(true);

                    var topOverlap = Math.max(($(window).scrollTop() + $("#ggbHeaderContent").outerHeight(true)) - (topStart - popupHeight), 0);
                    var bottomOverlap = Math.max(bottomStart + popupHeight - ($(window).scrollTop() + $(window).height()), 0);

                    if (topOverlap < bottomOverlap) {
                        // Show it on top
                        popup.addClass('position-top');
                    }

                    // Now really show it (unhide)
                    popup.css('visibility', 'visible');
                } else {
                    ex = $(e.target).closest("a");
                    var popup = ex.closest('.submenu-popup-container').find(".ggbSubmenuPopup, .submenu-popup").clone(true);
                    var div = $('.jTmpPopup');
                    if (div.length <= 0) {
                        div = $('<div>').addClass("submenu-popup-container").addClass("jTmpPopup");
                        $('body').append(div);
                    }

                    div.empty();
                    if (!ex.is(activePopUpElement)) {
                        activePopUpElement = ex;
                        div.append(popup);
                    } else {
                        activePopUpElement = null;
                        div.remove();
                        return;
                    }

                    div.data("id", ex.closest('.jItem').data("id"));

                    if (ex.parents('#ggbHeader').length > 0) {
                        div.css('position', 'fixed');
                        div.css('z-index', '3000');
                        div.css('left', ex.offset().left + $(ex.children()[0]).outerWidth() / 2 + 10);
                        div.css('top', ex.position().top + 8 + $(ex.children()[0]).outerHeight());
                    } else {
                        div.css('position', 'absolute');
                        div.css('z-index', '1960');
                        div.css('left', ex.offset().left + ex.outerWidth() / 2 + 10);
                        div.css('top', ex.offset().top + ex.outerHeight());
                    }

                    // Hide it ...
                    div.css('visibility', 'hidden');
                    popup.show();
                    div.show();

                    // Calculate overlapping of window to decide wether to show it upwards or downwards
                    var topStart = ex.offset().top;
                    var bottomStart = topStart + ex.outerHeight(true);
                    var popupHeight = div.find('ul').outerHeight(true);
                    var leftOverlap = Math.min(div.find('ul').offset().left, 0);

                    var topOverlap = Math.max(($(window).scrollTop() + $("#ggbHeaderContent").outerHeight(true)) - (topStart - popupHeight), 0);
                    var bottomOverlap = Math.max(bottomStart + popupHeight - ($(window).scrollTop() + $(window).height()), 0);

                    div.css({left: div.offset().left - leftOverlap});
                    div.find('.submenu-arrow').css({left: -25 + leftOverlap});

                    if (topOverlap < bottomOverlap) {
                        // Show it on top
                        popup.addClass('position-top');
                        div.css('top', div.offset().top - ex.outerHeight());
                    }

                    // Now really show it (unhide)
                    div.css('visibility', 'visible');
                }
            }

            if ((ex = $(e.target).closest('.j-showMore')).length > 0) {
                toggleMaterialLane($('#' + ex.data("element")), true);
            }
            if ((ex = $(e.target).closest('.j-showLess')).length > 0) {
                toggleMaterialLane($('#' + ex.data("element")), false);
            }
            if ((ex = $(e.target).closest('.btn-show-messages')).length > 0) {
                messagesShown = !messagesShown;
                showMessages(messagesShown);
                ex.find('.active-icon').removeClass("new_messages").toggleClass('active', messagesShown);
            }
        }).scroll( function(e) {
            // Closes the active popup when a swipeable object is scrolled vertically
            var ex;
            if ((ex = $(e.target).closest(".swipeable")).length > 0) {
                var currentLeft = $(e.target).scrollLeft();

                if (prevLeft !== currentLeft) {
                    var popup = $(".jTmpPopup");
                    prevLeft = currentLeft;

                    if (popup.length > 0) {
                        popup.empty();
                        popup.remove();
                        activePopUpElement = null;
                    }
                }
            }
        });

        $(window).resize(function() {
            var currentWidth = $(window).width();

            if (prevWidth !== currentWidth) {
                var popup = $(".jTmpPopup");
                prevWidth = currentWidth;

                if (popup.length > 0) {
                    popup.empty();
                    popup.remove();
                    activePopUpElement = null;
                }
            }

            // decide wheter more button is necessary or not
            initMaterialLanes();
        });

    }

    var messagesShown = false;

    function showMessages(show, donotpopulate) {
        var msgBox = $('.ggbMessages');

        $('.btn-show-messages .active-icon').removeClass("new_messages").toggleClass('active', show);
        messagesShown = show;
        if(show) {
            msgBox.animate({
               right: '0px'
            }, 200);
            if (window.GGBT_chat && !donotpopulate) {
                window.GGBT_chat.populateRecent();
            }
            msgBox.addClass("opened");
        }
        else {
            msgBox.animate({
                right: -(msgBox.width()+50) + 'px'
            }, 200);
            msgBox.removeClass("opened");
        }
    }

    function closePopups() {
        $(".submenu-popup-container .submenu-popup, .submenu-popup-container .ggbSubmenuPopup").hide();
        var popup = $(".jTmpPopup");

        popup.empty();
        popup.remove();
        activePopUpElement = null;
    }

    function initPositions() {
        prevLeft = $(window).scrollLeft();
        prevWidth = $(window).width();
    }

    function initSubPopupMenus() {
        var subPopupMenus = $('.submenu-popup-container').find('.submenu-content li.has-submenu');

        // Show and hide is done by css, but this is setting the current submenu active (highlight link)
        if(subPopupMenus.size() > 0) {
            if(isPhone()) {
                // on phones and tablets:  when clicking on the menu entry, submenu should slide up below
                $(subPopupMenus).click(function(e) {
                    var entry = $(e.target).parent('.has-submenu');

                    $(subPopupMenus).not(entry).find('.submenu-content').slideUp();
                    $(subPopupMenus).not(entry).children('a').removeClass('active');

                    entry.find('.submenu-content').slideToggle();
                    entry.children('a').toggleClass('active');
                });
            } else {
                // on desktops: when hovering, or clicking menu entries, submenu should fade in next to it
                $(subPopupMenus).hover(function(e) {
                    $(e.target).children('a').addClass('active');
                    $(e.target).find('.submenu-content').fadeIn('fast');

                    // if there is no space left on the right side, display submenu on left side
                    var submenu = $(e.target).find('.submenu-content');
                    if(submenu.length && submenu.offset().left + submenu.outerWidth() > $(window).width()) {
                        submenu.addClass('leftSide');
                    }

                }, function(e) {
                    $(subPopupMenus).children('a').removeClass('active');
                    $(subPopupMenus).find('.submenu-content').fadeOut('fast');
                });
                $(subPopupMenus).click(function(e) {
                    var entry = $(e.target).parent('.has-submenu');

                    $(subPopupMenus).not(entry).find('.submenu-content').fadeOut('fast');
                    $(subPopupMenus).not(entry).children('a').removeClass('active');

                    entry.find('.submenu-content').fadeToggle();
                    entry.children('a').toggleClass('active');

                    // if there is no space left on the right side, display submenu on left side
                    var submenu = entry.find('.submenu-content');
                    if(submenu.length && submenu.offset().left + submenu.outerWidth() > $(window).width()) {
                        submenu.addClass('leftSide');
                    }
                });
            }
        }
    }

    /**
     * If the header is fixed, but a info header is displayed
     * the GGBheader position needs to be updated!
     * @var visible: true for show, false for hide
     */
    function showInfoHeader(visible) {
        var infoHeader = $('.ggbHeaderInfo');
        var ggbHeader = $('#ggbHeader');
        var ggbHeaderPlaceholder = $('#ggbHeaderPlaceholder');

        if(ggbHeader.hasClass('fixed') && infoHeader.hasClass('visible')) {
            if(visible) {
                infoHeader.show();
                ggbHeader.css({ top: infoHeader.outerHeight() + 'px' });
                ggbHeaderPlaceholder.height(infoHeader.outerHeight() + ggbHeader.outerHeight());
            } else if(!visible) {
                ggbHeader.css({ top: '0px' });
                ggbHeaderPlaceholder.height(ggbHeader.outerHeight());
            }
        }
    }

    /**
     * Makes sure the infoHeader scrolls away but the
     * ggbHeader stays fixed on page (on top)
     */
    function initUpdateHeadersOnScroll() {
        $(window).on('scroll', function(e) {
            if($(window).scrollTop() > 0) {
                showInfoHeader(false);
            } else {
                showInfoHeader(true);
            }
        });
    }

    function initCloseHeaderInfo() {
        $('.j-info-close').on('click', function (e) {
            showInfoHeader(false);
            $('.ggbHeaderInfo').removeClass('visible');
        });
    }

    var forum_textedit_observer = null;

    function initHTTPSimages() {
        $('.link-to-image').on("click", function() {
            var ta_text = $("#ta_text_editor,#comment_text_editor");
            if (ta_text.length > 0) {

                if (forum_textedit_observer == null) {
                    var observe_body = ta_text.contents().find('body');

                    if (observe_body.length > 0) {
                        forum_textedit_observer = new MutationObserver(function (mutations, observer) {
                            // fired when a mutation occurs
                            // replace all src with http: by https:
                            observe_body.html(observe_body.html().replace(/(<img.*?src=")http:(.*?>)/igm, '$1https:$2'));
                        });

                        // define what element should be observed by the observer
                        // and what types of mutations trigger the callback
                        forum_textedit_observer.observe(observe_body[0], {
                            subtree: true,
                            attributes: true
                            //...
                        });
                    }
                }
            }
        });
        $('#ta_text,#comment_text').on("blur change", function() {
            $(this).val($(this).val().replace(/(\[img])http:(.*?\[\/img])/igm, "$1https:$2"));
        });
    }

    /**
     * Allows you to easily turn ajax loading for a special container on/off
     * Use body for entire page
     * @param container: Can be any container which should contain the loading gif
     * @param on: Switch it on or off?
     */
    function showAjaxLoading(container, on) {
        if(on) {
            if (window.GGBT_spinner && window.Spinner) {
                window.GGBT_spinner.attachSpinner(container.get(0), '50%');
            } else {
                container.addClass('ajax-load');
                container.scrollTop(0);
                container.append('<div class="ajax-loading-glass"></div>');
            }
        } else {
            if (window.GGBT_spinner && window.Spinner) {
                window.GGBT_spinner.removeSpinner(container.get(0));
            } else {
                container.removeClass('ajax-load');
                container.children().filter(".ajax-loading-glass").remove();
            }
        }
    }

    function init() {
        initSetMenuVisibleButton();
        //initPopupMenus();
        initHandlers();
        initPositions();
        initSubPopupMenus();
        initMaterialLanes();

        //landing page
        initShowLoveBannerButtons();
        initRotateBannerButtons();

        //download page
        initScrollButtons();

        //teampage
        initShowTranslatorsPopup();

        //used for now only on the partners page: more info sliding down
        initMoreInfoButtons();

        // for header info
        // init scroll listener
        initUpdateHeadersOnScroll();
        // init close info button
        initCloseHeaderInfo();

        // init listener for forcing images in help to be https
        initHTTPSimages();

        $(window).resize();
    }

    function reinitAfterLoad() {
        initPopupMenus();
        initSubPopupMenus();
    }

    return {
        init : init,
        reinitAfterLoad : reinitAfterLoad,
        closePopups : closePopups,
        showAjaxLoading : showAjaxLoading,
        isTablet : isTablet,
        isPhone : isPhone,
        initMaterialLane : initMaterialLane,
        toggleMaterialLane : toggleMaterialLane,
        showMessages: showMessages
    };
})(jQuery);

jQuery(document).ready(function() {
    "use strict";
    GGB_general.init();
});