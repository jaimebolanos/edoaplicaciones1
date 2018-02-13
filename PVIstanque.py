
# coding: utf-8

# In[1]:

from sympy import init_printing 
init_printing()
import sympy
from sympy import *
from sympy import symbols
v2,v1,v0,A0,c1,vt,x,t,d,e,C1,k,fi,i,p = symbols('v2 v1 v0 A0 c1 vt x t d e C1 k fi i p')
A= Function('A ')
p= Function('p ')
v1=8 # l/min
v2=8 # l/min
v0=25 #l/min
vt=50 #l
A0=500 #g
c1=5 #g/l

# expreso la ecuacion

f = c1*v1-v2*A(t)/(25+(v1-v2)*t)

b=Eq(A(t).diff(t), f)
b


# In[2]:

#Factor integrante

    
p=v2/(25+(v1-v2)*t)
g=integrate(p,t)
if v1<v2:
    h=g.subs(2*t-25,-(2*t-25)) # cambia el valor ya que me parece que hay un error en el programa
    j=E**h
if v1>=v2:
    j=E**g
j


# In[3]:

e=(c1*v1*integrate(j,t)+k)/j
g=Eq(A(t),e)
g


# In[4]:

p=g.subs([(A(t),500),(t,0)])
p


# In[5]:

z=solve(p,k)
z=z[0]
z


# In[6]:

n=g.subs(k,z)
n


# In[7]:

m=n.subs(t,11.3)
m


# In[ ]:



