// JavaScript Document
/**
 * Fake Century Gothic font for Users that don't have Century Gothic font installed on their computer
 * Used for headings
 * @type {{google: {families: string[]}}}
 */

WebFontConfig = {google: { families: [ 'Muli:400:latin' ] }};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
