// 
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const PlanetSimulation = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let sun;
      let planets = [
        {name: "Mercury", mass: 6, radius: 60, velocity_x: 20, velocity_y: 8, col: [186,57,2]},
        {name: "Venus", mass: 6, radius: 100, velocity_x: 20, velocity_y: 8, col: [204,102,70]},
        {name: "Earth", mass: 6, radius: 140, velocity_x: 20, velocity_y: 8, col: [51,255,200]},
        {name: "Mars", mass: 6, radius: 180, velocity_x: 20, velocity_y: 8, col: [153,0,0]},
        {name: "Jupiter", mass: 6, radius: 220, velocity_x: 20, velocity_y: 8, col: [170,76,0]},
        {name: "Saturn", mass: 6, radius: 260, velocity_x: 20, velocity_y: 8, col: [150,204,204]},
        {name: "Uranus", mass: 6, radius: 300, velocity_x: 20, velocity_y: 8, col: [58,130,142]},
        {name: "Neptune", mass: 6, radius: 340, velocity_x: 20, velocity_y: 10, col: [0,0,153]},
      ];
      let G = 2;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        sun = new Body(18, p.createVector(0,0,0), p.createVector(0,0), p.color(255,230,51), "Sun");

        for (let planet of planets) {
          let r = planet.radius;
          let theta = p.PI;
          let planetPos = p.createVector(r*p.cos(theta), r*p.sin(theta));

          let planetVelocity = p.createVector(planet.velocity_x, planet.velocity_y);
          planetVelocity.rotate(p.HALF_PI);
          planetVelocity.setMag(p.sqrt((G*sun.mass)/(planetPos.mag())));

          planet.col = p.color(planet.col[0],planet.col[1],planet.col[2]);
          planets[planets.indexOf(planet)] = new Body(planet.mass, planetPos, planetVelocity, planet.col, planet.name);
        }
      };

      p.draw = () => {
        p.translate(p.width/2, p.height/2);
        p.background(0);
        sun.show();

        for (let planet of planets) {
          sun.attract(planet);
          planet.update();
          planet.show();
        }

        p.translate(-p.width/2, -p.height/2);
        for (let planet of planets) {
          if (planet.clicked) {
            p.fill(255);
            p.rect(p.width - (p.width/3), p.height - (p.height/3), p.width/3, p.height/3);
            if (!planet.closeButton) {
              planet.closeButton = p.createButton("X");
              planet.closeButton.position(p.width - (p.width/3), p.height - (p.height/3));
              planet.closeButton.mousePressed(() => {
                planet.clicked = false;
                planet.closeButton.remove();
                planet.closeButton = null;
              });
            }
          }
        }
      };

      function Body(mass, position, velocity, col, name) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.r = this.mass * 2;
        this.path = [];
        this.col = col;
        this.name = name;
        this.clicked = false;
        this.closeButton = false;

        this.setLineDash = function(list) {
          p.drawingContext.setLineDash(list);
        };

        this.show = function() {
          p.stroke(this.col);
          p.fill(this.col);
          p.circle(this.position.x, this.position.y, this.r*2);

          for (let i=0; i<this.path.length -2; i++) {
            p.line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y);
          }

          p.fill(250);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(12);
          p.text(this.name, this.position.x+this.r, this.position.y+this.r);
        };

        this.update = function() {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.path.push(this.position.copy());
          if (this.path.length > 300) {
            this.path.splice(0,1);
          }
        };

        this.applyForce = function(force) {
          this.velocity.x += force.x/this.mass;
          this.velocity.y += force.y/this.mass;
        };

        this.attract = function(orbitor) {
          let r = p.dist(this.position.x, this.position.y, orbitor.position.x, orbitor.position.y);
          let f = this.position.copy().sub(orbitor.position);
          f.setMag((G*this.mass*orbitor.mass) / (r**2));
          orbitor.applyForce(f);
        };
      }

      p.mousePressed = () => {
        let mouseVector = p.createVector(p.mouseX - p.width/2, p.mouseY - p.height/2);
        for(let planet of planets) {
          if (p5.Vector.dist(mouseVector, planet.position) < planet.r) {
            planet.clicked = true;
          } else {
            planet.clicked = false;
          }
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default PlanetSimulation;