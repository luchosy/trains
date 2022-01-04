/*
***TRAIN MAP***
Train Map is a interactive art piece that allows you to make a metro-esque art piece by selecting, creating, and drawing paths to terminals.

To interact with this piece, use the UP and DOWN arrows to control the speed of the path builder. 

The SHIFT button allows you to change the location you want to travel out of. 

ANY other button on the keyboard increases the number of paths created per click.

Hope you enjoy!
Luc Hosy
*/

let locations = [];
let travelers = [];
let clickcounter = 0;
let coordinatesX = [];
let coordinatesY = [];
let velocityX;
let velocityY;
let total = 0;
let m = 1;
let j = 0;

class Location {
  constructor(){
    this.pos = createVector(mouseX, mouseY) //This sets a location dot to your mouseX and mouseY 
    this.r = 12; //radius of dot
  }

  createLocation(){
    stroke(0);
    strokeWeight(1);
    fill(232);
    circle(this.pos.x, this.pos.y, this.r);
  }
}

class Traveler {
  constructor(){
    this.w = 6;
    this.speed = 2;
    this.place = createVector(coordinatesX[j], coordinatesY[j]);
    this.choice = floor(random(0, (clickcounter - 1))); //this randomly decides which station to travel to
    this.color = createVector(random(0, 255),random(0, 255),random(0, 255)); //random color
  }

  createTraveler(){
    noStroke();
    circle(this.place.x, this.place.y, this.w);
    fill(this.color.x, this.color.y, this.color.z); //rgb except using vector information
  }

  goTravel(){
    let history = [] //ignore these two 
    history = locations;
    if (clickcounter < 1){ //this controls how many locations you need before travelers start traveling
      this.choice = 0
    }
    //if (this.place.x == coordinatesX[this.choice]){
      // velocityX = 0;
      // velocityY = 0;
      // this.place.x = coordinatesX[this.choice];
      // this.place.y = coordinatesY[this.choice];
      //this.place = this.position();
      //print(this.place);
      //this.choice = floor(random(1, (clickcounter - 1)));

    let destination = createVector(coordinatesX[this.choice] - this.place.x, coordinatesY[this.choice] - this.place.y); //change the one to choice eventually
    let direction = destination.heading();
    velocityX = this.speed * cos(direction) * m;
    velocityY = this.speed * sin(direction) * m;
    this.place.x += velocityX;
    this.place.y += velocityY; //This takes the randomly selected destination and finds the angle between the two stations. It then breaks this down into x and y movements by applying a velocity to a cartesian direction.
    }
    // destination.heading();
    //console.log(locations)
    // this.history = [];
    // this.history.push(this.x);
    // this.history.push(this.y);

}

function keyPressed(){ //the controls
  if (keyCode === UP_ARROW) {
    m += 0.05;
  } else if (keyCode === DOWN_ARROW) {
    m -= 0.05;
  } else if (keyCode === SHIFT) {
    j += 1;
  } else {
    total += 1;
  }
}

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  background(232);
  frameRate(60);
}

function mousePressed(){ // the activator function
  clickcounter++
  locations.push(new Location());
  coordinatesX.push(mouseX);
  coordinatesY.push(mouseY);
  for(let t = 0; t <= total; t++){ //This dictates the number of travelers in the population
    travelers.push(new Traveler());
  }
}

function draw(){ //keeps the shapes on the screen
for(let i = 0; i < locations.length; i++){
  locations[i].createLocation();
}
for(let n = 0; n < travelers.length; n++){
  travelers[n].createTraveler();
  if(clickcounter > 2){
    travelers[n].goTravel();
  }
}
}

function windowResized(){ //scalability
  resizeCanvas(windowWidth, windowHeight);
}

/* 
SOURCES
https://p5js.org/learn/interactivity.html -> Learned about Mouse interactivity
https://p5js.org/reference/#/p5/keyPressed -> Learned about Keyboard interactivity
https://happycoding.io/tutorials/p5js/input -> More on how to link key input to actions
https://www.geeksforgeeks.org/p5-js-position-function/ -> This is where I learned about the position function
https://p5js.org/examples/hello-p5-animation.html -> Had some issues with my getting objects to move across the screen so I had to look at this for a little help
https://p5js.org/reference/#/p5/cos -> Learned about the cos() method in p5.js
https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html -> This helped me get a better understanding of the heading function and how to give an object direction from a polar vector
https://p5js.org/examples/math-polartocartesian.html -> Polar to cartesian coordinates
https://p5js.org/reference/#/p5.Vector/heading -> Heading method which is critical to the success of this program
https://p5js.org/reference/#/p5/rect -> Originally used rectangles but learned that
https://p5js.org/reference/#/p5/keyPressed -> Learned how to create keyboard interactivity with if loops

*/