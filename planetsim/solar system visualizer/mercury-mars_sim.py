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
pi = 3.14159
G = 4*(pi**2)
# G in natural units:
# v^2/r = GM/r^2 -> G = v^2r/M, r=1 and M(sun) = 1
earthVi = 2*pi
#a = 4(pi**2)/r^2 = G/r^2
star = sphere(pos = vec(0,0,0), radius=0.1, color=color.yellow, velocity=vector(0,0,0), make_trail = True) #this and the earth are vectors with come extra fancy stuff added on
Mercury = sphere(pos = vec(0.6,0,0), radius=0.05, color=color.magenta,velocity = vector(0,earthVi, 0), make_trail = True) 
Venus = sphere(pos = vec(1.1,0,0), radius=0.05, color=color.orange,velocity = vector(0,earthVi, 0), make_trail = True) 
Earth = sphere(pos = vec(1.5,0,0), radius=0.05, color=color.blue,velocity = vector(0,earthVi, 0), make_trail = True) 
Mars = sphere(pos = vec(2.3,0,0), radius=0.05, color=color.red,velocity = vector(0,earthVi, 0), make_trail = True) 


dt = 0.001
def acceleration (p1, p2): #vector of earth and vector of sun position
    r_vec = p1.pos - p2.pos #vector from sun to earth
    r_mag = mag(r_vec) #magnitude of r_vec
    r_hat = r_vec/r_mag #unit vector in direction of r

    a_mag = G/(r_mag)
    a_vec = -a_mag*r_hat #this negative is rlly important idk why tho

    return a_vec

while (True):
    rate(500) #updates up to 500 times per second

    Mercury.acceleration = acceleration(Mercury, star)
    Mercury.velocity = Mercury.velocity + Mercury.acceleration * dt 
    Mercury.pos = Mercury.pos + Mercury.velocity*dt

    Venus.acceleration = acceleration(Venus, star)
    Venus.velocity = Venus.velocity + Venus.acceleration * dt 
    Venus.pos = Venus.pos + Venus.velocity*dt

    Earth.acceleration = acceleration(Earth, star)
    Earth.velocity = Earth.velocity + Earth.acceleration * dt 
    Earth.pos = Earth.pos + Earth.velocity*dt

    Mars.acceleration = acceleration(Mars, star)
    Mars.velocity = Mars.velocity + Mars.acceleration * dt 
    Mars.pos = Mars.pos + Mars.velocity*dt


    