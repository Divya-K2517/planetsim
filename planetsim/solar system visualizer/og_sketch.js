//variable declarations
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

function setup() {
  createCanvas(windowWidth, windowHeight); //entire window is the canvas
  sun = new Body(18,createVector(0,0,0), createVector(0,0), color(255,230,51), "Sun") //creating the sun, no velocity in the center of the screen

  for (let planet of planets) { //runs through each planet
    let r = planet.radius;
    let theta = PI
    let planetPos = createVector(r*cos(theta), r*sin(theta));

    //planet velocity
    let planetVelocity = createVector(planet.velocity_x, planet.velocity_y);
    planetVelocity.rotate(HALF_PI); //makes velocity perpendicular to the position vector
    planetVelocity.setMag( sqrt((G*sun.mass)/(planetPos.mag()))) ;

    //for the col here declare it here 
    planet.col = color(planet.col[0],planet.col[1],planet.col[2]) 
    planets[planets.indexOf(planet)] = new Body(planet.mass, planetPos,planetVelocity, planet.col, planet.name)  //adds each new planet to the planet array
  }
}

function draw() {
  translate(width/2, height/2) //makes 0,0 at the center of the screen instead of top left
  background(0);
  sun.show();

  for (let planet of planets) { //loops through all the elements of planets
    sun.attract(planet)
    planet.update() //changes position
    planet.show()
  }

  translate(-width/2, -height/2); // Move to screen coordinates
  for (let planet of planets) {
    if (planet.clicked) {
      fill(255);
      rect(width - (width/3), height - (height/3), width/3, height/3);
      //creates close button if it isnt there already
      if (!planet.closeButton) {
      planet.closeButton = createButton("X")
      planet.closeButton.position(width - (width/3),height - (height/3) )
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
    drawingContext.setLineDash(list);
  }
  
  //function to draw the body
  this.show= function(){
    stroke(this.col); fill(this.col); 
    circle(this.position.x, this.position.y, this.r*2) //two radii are equal so its a circle

    for (let i=0; i<this.path.length -2; i++){ //iterates through every element in the path array      
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y) //makes a line from one element(position) to the next
    }

    //adding a label for each planet
    fill(250)
    noStroke()
    textAlign(CENTER,CENTER)
    textSize(12)
    text(this.name, this.position.x+this.r, this.position.y+this.r)
    
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
    let r = dist(this.position.x, this.position.y, orbitor.position.x, orbitor.position.y ) 
    //Fg
    let f = this.position.copy().sub(orbitor.position) //creates vector from the orbitor to the sun
    f.setMag( (G*this.mass*orbitor.mass) / (r**2) ) 
    orbitor.applyForce(f)
  }
}

function mousePressed() {
  //creating a vector for the mouse, sets the mouse coordinate plane to have the origin at the center of the screen, same as the planets
  let mouseVector = createVector(mouseX - width/2, mouseY - height/2);
  for(let planet of planets) { //iterates through every planet
    if (p5.Vector.dist(mouseVector, planet.position) < planet.r) {
    //p5.Vector.dist() calculates distance between the mouse and the center of the planet, then checks if this distance is less than planet radius(within the circle)
      planet.clicked = true //turns true to false and false to true
    } else {
        planet.clicked = false; // Close other planets' info boxes
    }
}
}

