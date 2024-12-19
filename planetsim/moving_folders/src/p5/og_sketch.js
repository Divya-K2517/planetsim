import p5 from 'p5';
import { useEffect, useRef} from 'react';

function sketch(p) {
  let sun 
  let planets = [
    {name: "Mercury", mass: 6, radius: 60, velocity_x: 20, velocity_y: 8, col: [186,57,2]},
    {name: "Venus", mass: 6, radius: 100, velocity_x: 20, velocity_y: 8, col: [204,102,70]},
    {name: "Earth", mass: 6, radius: 140, velocity_x: 20, velocity_y: 8, col: [51,255,200]},
    {name: "Mars", mass: 6, radius: 180, velocity_x: 20, velocity_y: 8, col: [153,0,0]},
    {name: "Jupiter", mass: 6, radius: 220, velocity_x: 20, velocity_y: 8, col: [170,76,0]},
    {name: "Saturn", mass: 6, radius: 260, velocity_x: 20, velocity_y: 8, col: [150,204,204]},
    {name: "Uranus", mass: 6, radius: 300, velocity_x: 20, velocity_y: 8, col: [58,130,142]},
    {name: "Neptune", mass: 6, radius: 340, velocity_x: 20, velocity_y: 10, col: [0,0,153]},
  ] 
  let G = 2
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight); //entire window is the canvas
    sun = new Body(18,p.createVector(0,0,0), p.createVector(0,0), p.color(255,230,51), "Sun") //creating the sun, no velocity in the center of the screen
  
    for (let planet of planets) { //runs through each planet
      let r = planet.radius;
      let theta = p.PI
      let planetPos = p.createVector(r*p.cos(theta), r*p.sin(theta));
  
      //planet velocity
      let planetVelocity = p.createVector(planet.velocity_x, planet.velocity_y);
      planetVelocity.rotate(p.HALF_PI); //makes velocity perpendicular to the position vector
      planetVelocity.setMag( p.sqrt((G*sun.mass)/(planetPos.mag()))) ;
  
      //for the col here declare it here 
      planet.col = p.color(planet.col[0],planet.col[1],planet.col[2]) 
      planets[planets.indexOf(planet)] = new Body(planet.mass, planetPos,planetVelocity, planet.col, planet.name)  //adds each new planet to the planet array
    }

  }

  p.draw = function() {
    p.translate(p.width/2, p.height/2) //makes 0,0 at the center of the screen instead of top left
    p.background(0);
    sun.show();
  
    for (let planet of planets) { //loops through all the elements of planets
      sun.attract(planet)
      planet.update() //changes position
      planet.show()
    }
  
    p.translate(-p.width/2, -p.height/2); // Move to screen coordinates
    for (let planet of planets) {
      if (planet.clicked) {
        p.fill(255);
        p.rect(p.width - (p.width/3), p.height - (p.height/3), p.width/3, p.height/3);
        //creates close button if it isnt there already
        if (!planet.closeButton) {
        planet.closeButton = p.createButton("X")
        planet.closeButton.position(p.width - (p.width/3),p.height - (p.height/3) )
        //if the close button is pressed
        planet.closeButton.mousePressed(() => {
          planet.clicked = false //closes the box
          planet.closeButton.remove() //removes the x 
          planet.closeButton = null //idrk
        });
        }
      }
    }
  }

function Body(mass, position, velocity, col, name) { //creating an constrcutor function that is used to create objects
  //setting each property of the object equal to the parameter
  this.mass = mass//this. refers to the current object
  this.position = position
  this.velocity = velocity
  this.r = this.mass * 2 //this.r is radius, radius is same as mass
  this.path = []//empty array
  this.col = col
  this.name = name
  this.clicked = false
  this.closeButton = false

  this.setLineDash = function(list) {
    p.drawingContext.setLineDash(list);
  }
  
  //function to draw the body
  this.show= function(){
    p.stroke(this.col); p.fill(this.col); 
    p.circle(this.position.x, this.position.y, this.r*2) //two radii are equal so its a circle

    for (let i=0; i<this.path.length -2; i++){ //iterates through every element in the path array      
      p.line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y) //makes a line from one element(position) to the next
    }

    //adding a label for each planet
    p.fill(250)
    p.noStroke()
    p.textAlign(p.CENTER,p.CENTER)
    p.textSize(12)
    p.text(this.name, this.position.x+this.r, this.position.y+this.r)
    
  }

  this.update = function() {
    //updating position
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.path.push(this.position.copy()) //fills the array with each current position of the planet
    //drawing the path
    if (this.path.length > 300){ //keeps the path at a constant length
      this.path.splice(0,1) //removes one item from index 0
    }
  }

    //applying force of gravity
  this.applyForce = function(force) {
    //acceleration affecting velocity
    this.velocity.x += force.x/this.mass 
    this.velocity.y += force.y/this.mass 
  }

  this.attract = function(orbitor) { //takes the orbiting body as a parameter
    //gravity
    let r = p.dist(this.position.x, this.position.y, orbitor.position.x, orbitor.position.y) 
    //Fg
    let f = this.position.copy().sub(orbitor.position) //creates vector from the orbitor to the sun
    f.setMag( (p.G*this.mass*orbitor.mass) / (r**2) ) 
    orbitor.applyForce(f)
  }
}

p.mousePressed = function() {
  //creating a vector for the mouse, sets the mouse coordinate plane to have the origin at the center of the screen, same as the planets
  let mouseVector = p.createVector(p.mouseX - p.width/2, p.mouseY - p.height/2);
  for(let planet of planets) { //iterates through every planet
    if (p.Vector.dist(mouseVector, planet.position) < planet.r) {
    //p.Vector.dist() calculates distance between the mouse and the center of the planet, then checks if this distance is less than planet radius(within the circle)
      planet.clicked = true //turns true to false and false to true
    } else {
        planet.clicked = false; // Close other planets' info boxes
    }
}
}

}

function P5component() {
  // create a reference to the container in which the p5 instance should place the canvas
  const p5ContainerRef = useRef();

  useEffect(() => {
      // On component creation, instantiate a p5 object with the sketch and container reference 
      const p5Instance = new p5(sketch, p5ContainerRef.current);

      // On component destruction, delete the p5 instance
      return () => {
          p5Instance.remove();
      }
  }, []);

  return (
      <div className="P5component" ref={p5ContainerRef} />
  );
}
export default P5component;

//variable declarations


