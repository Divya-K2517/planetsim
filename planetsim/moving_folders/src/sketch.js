// 
import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import {getMercury} from './api';
import { mercury_questions } from './questions.js';


const PlanetSimulation = () => {
  const sketchRef = useRef();
  //const [planetTexts, setPlanetTexts] = useState({});

  useEffect(() => {
    const sketch = (p) => {
      let sun;
      let planets = [
        {name: "mercury", mass: 6, radius: 60, velocity_x: 20, velocity_y: 8, col: [186,57,2]},
        {name: "venus", mass: 6, radius: 100, velocity_x: 20, velocity_y: 8, col: [204,102,70]},
        {name: "earth", mass: 6, radius: 140, velocity_x: 20, velocity_y: 8, col: [51,255,200]},
        {name: "mars", mass: 6, radius: 180, velocity_x: 20, velocity_y: 8, col: [153,0,0]},
        {name: "jupiter", mass: 6, radius: 220, velocity_x: 20, velocity_y: 8, col: [170,76,0]},
        {name: "saturn", mass: 6, radius: 260, velocity_x: 20, velocity_y: 8, col: [150,204,204]},
        {name: "uranus", mass: 6, radius: 300, velocity_x: 20, velocity_y: 8, col: [58,130,142]},
        {name: "neptune", mass: 6, radius: 340, velocity_x: 20, velocity_y: 10, col: [0,0,153]},
      ];
      let G = 2;
      //getText() gets the text in a planets table

      //  async function getText (planet) {
      //   const text = await p.httpGet(`http://localhost:3001/api/${planet}_questions`, 'text', false);
      //   setPlanetTexts((prevTexts) => ({ ...prevTexts, [planet]: text }));
      // }
      
      let currentQuestion = {
        "mercury": null,
        "venus": null,
        "earth": null,
        "mars": null,
        "jupiter": null,
        "saturn": null,
        "uranus": null,
        "neptune": null
      };

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
      const used_choices = [];
      p.draw = async () => {
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
            //text() x and y r oorindates of the bottom left corner
            //Math.floor(Math.random() * (max - min + 1) + min);
            console.log('Planet name:', planet.name); //checking to see that planet.name is defined
            const arraynames = {
              "mercury": mercury_questions,
              // venus: venus_questions,
              // earth: earth_questions,
              // mars: mars_questions,
              // jupiter: jupiter_questions,
              // saturn: saturn_questions, 
              // uranus: uranus_questions,
              // neptune: neptune_questions
            };
            function getArrayName(planetName)
            {
              return arraynames[planetName];
            }
            
            if (!currentQuestion[planet.name] && !planet.answerButtons) {
              const array = getArrayName(planet.name);
              const question_num = Math.floor(Math.random() * ((array.length - 1) - 0 + 1) + 0);
              currentQuestion[planet.name] = array[question_num];
            }
            //getArrayName(p.name) returns the name of the array needed

            if (currentQuestion[planet.name]) {
              p.fill(0);
              p.text(currentQuestion[planet.name][1], p.width - (p.width/3) + 10, p.height - (p.height/3) - 70, p.width/3 - 20, p.height/3 - 20);
              
              const answer_options = [
                currentQuestion[planet.name][2], //string answer option
                currentQuestion[planet.name][3],
                currentQuestion[planet.name][4],
                currentQuestion[planet.name][5] ];

              let ct = 180;
              used_choices.length = 0; // Clear used choices
              planet.answerButtons = [];
              while (used_choices.length < 4){
                const choice = Math.floor(Math.random() * (3 - 0 + 1) + 0); //answer choices are in the range of 3-5
                if (!used_choices.includes(choice)){
                  used_choices.push(choice);
                  console.log(used_choices); //checking contents of used_choices
                  console.log(answer_options[choice])
                }
              }

              answer_options.forEach((option) => {
                let button = p.createButton(option);
                button.position(p.width - (p.width/4), p.height - (p.height/3) + ct);
                button.attribute('data-option', option);
                //button.id = `${option}`;
                console.log("printing each button id: ", option);
                button.mousePressed(() => {
                  if (option == currentQuestion[planet.name][2]) {
                    button.style('background-color', 'green');
                  }
                  else{
                    button.style('background-color', 'red');
                  }
                });
                planet.answerButtons.push(button);
                ct += 40;
              });

            }
            // p.text(getText(planet.name),(p.width/3), p.height - (p.height/3));
            if (!planet.closeButton) {
              planet.closeButton = p.createButton("X");
              planet.closeButton.position(p.width - (p.width/3), p.height - (p.height/3) + 100);
              planet.closeButton.mousePressed(() => {
                planet.clicked = false;
                planet.closeButton.remove();
                planet.closeButton = null; //tells the program that the close button isnt there anymore

                if (planet.answerButtons && planet.answerButtons.length > 0) {
                  planet.answerButtons.forEach(button => {
                    button.remove();
                  });
                  planet.answerButtons = [];
                }                
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
          if (planet && planet.position) {
          if (p5.Vector.dist(mouseVector, planet.position) < planet.r) {
            planet.clicked = true;
          } 
          
          // else {
          //   planet.clicked = false;
          // }

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