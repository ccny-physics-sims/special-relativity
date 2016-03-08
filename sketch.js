
var train; //this will be the moving rectangle across screen
var blip; //this will be light/laser particle(s) bouncing between moving train


function setup(){
  createCanvas(720,400);

  train = new reg; //create new "regular" train where everything appear normal
  blip = new blip;//creates new light particle. I would like to be able to generate new ones on click or something


  noLoop(); //prevents the draw function from continously looping until otherwise prompted
}          //the train rectangle will be drawn in setup tho

function draw(){

  background(230);
  fill(0);
  textSize(12);
  text('Hold mouse button to move train, and shoot and trace laser light',20,20);
  //class functions for train and light particle
      train.move();
      train.display();

      blip.move();
      blip.display();
      blip.trace();

}


function mousePressed(){ //when mouse is pressed draw function will loop creating animation
  loop();
}
function mouseReleased(){ //when mouse is released after click the animation will cease but objects are still visible where they had stopped
  noLoop();
}//the click/release can be continously used and the animation will start/stop from any position


function reg(){
//sets up cooridnates of train and traveling speed
  this.x = 100;
  this.y = 100;
  this.xspeed = 2;
  this.yspeed = 0

  this.move = function(){

    if (this.x > 500){ //stops train after certain point, before off canvas
      this.xspeed = 0;
    }else{
      this.x = this.x + this.xspeed; //moves train at constant speed to right
    }

  };
  this.display = function(){
    fill(100,100,100);
    rect(this.x,this.y,100,50); //larger rectangle (train)
    fill(50,50,50);
    rect(this.x+25,this.y+40,10,10); //smaller box on train (light source)
  };
}

function blip(){
//sets up coordinates of light partcile and speed based off of train.speeds/positions
    this.x = train.x + 30;
    this.y = train.y + 40;
    this.xspeed = train.xspeed; //laser light shot directly upwards on train will move with train's horizontal velocity
    this.yspeed = -1;           //as well as the lights vertical speed


    this.history = []; //an array used to store the history of (x,y) cooridinates of the laser light "blip"

  this.move = function(){

    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    if (this.y < 100 || this.y > 145){ //keeps light partcile bouncing in train
      this.yspeed = this.yspeed*-1
    }else{

    }
    if (this.x > 530){ //stops laser light after certain point, before off canvas
      this.xspeed = 0;
      this.yspeed = 0;
    }else{

    }
    var v = createVector(this.x, this.y); //updates history array after every draw itertion
    this.history.push(v);
  };



  this.display = function(){

    fill(100,10,10);
    rect(this.x,this.y,2,5); //draws tiny red laser rectngle to represent the light
  }

  this.trace = function(){ //traces the laser light in a specific section to form pretty triangle

    for (var i = 87; i < this.history.length; i++) {
      var pos = this.history[i];
      if (i<=181){               //i = 87, 181 are the initial and terminal indicies of the history array to form pretty triangle
      noStroke();
      fill(150,50,50);
      ellipse(pos.x, pos.y+2.5, 2, 2); //draws a small red ellipse to "trace" the laser light
    } else{};
    };

  }


}
