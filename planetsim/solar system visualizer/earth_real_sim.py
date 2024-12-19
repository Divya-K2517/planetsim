import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import math
from vpython import *
#https://medium.com/@pelicanlabs/a-very-simple-python-simulation-of-earths-orbit-29589a39af22
#^website 

#distance from sun in milllions of km, all values are divided by 100 to maintain simpler code
#Mercury: 58 ->0.6
#Venus: 108 -> 1.1
#Earth: 149.7 -> 1.5
#Mars: 227.9 -> 2.3
#Jupiter: 778 -> 7.8
#Saturn: 1,437 -> 14.4
#Uranus: 2,871 -> 28.7
#Neptune: 4,530 -> 453

#ac = v^2/r
#fg = (Gm1m2)/r^2
#v = 2(pi)r / T
#natural units so radius of earth is 1 and time for one orbit is 1
G = 6.67e-11
scalingfactor=1e-9
# G in natural units:
# v^2/r = GM/r^2 -> G = v^2r/M, r=1 and M(sun) = 1

#earth tangential velocity = 30000m/s -> 30
earthVi = 10000
earthMass = 10#5.972e24 -> 5.972e4
sunMass = 20 #1.989e30->1.989e10
#a = 4(pi**2)/r^2 = G/r^2
sun = sphere(pos = vec(0,0,0), radius=0.1, color=color.yellow, mass= sunMass, velocity=vector(0,0,0), make_trail = True) #this and the earth are vectors with come extra fancy stuff added on

earth = sphere(pos = vec(1.5,0,0), radius=0.05, color=color.blue, mass=earthMass, velocity = vector(0,earthVi, 0), make_trail = True) 

dt = 0.001

while (True):
    rate(500) #updates up to 500 times per second

    r_vec = earth.pos-sun.pos
    r_mag = mag(r_vec)
    earth_a_mag = (G(earth.mass))/(r_mag**2)
    r_hat = r_vec/r_mag #unit vector
    a_vec = -r_hat*earth_a_mag #acceleration vector
    a_x = a_vec.x
    a_y = a_vec.y
    
    earth.velocity.x = earth.velocity.x + (a_x * dt) #x and y components of velocity
    earth.velocity.y = earth.velocity.y + (a_y * dt) 
    earth.pos.x = earth.pos.x + (earth.velocity.x * dt)
    earth.pos.y = earth.pos.y + (earth.velocity.y * dt)

#r_vec = earth.pos - sun.pos
#r_mag = mag(r_vec) 

#dx = v * dt
#dv = a * dt
#a = Gm_sun/(r_mag)^2

    