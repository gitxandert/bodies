let sun_x;
let sun_y;
let merc_x;
let merc_y;
let ven_x;
let ven_y;
let earth_x;
let earth_y;
let mars_x;
let mars_y;
let jup_x;
let jup_y;
let sat_x;
let sat_y;
let ur_x;
let ur_y;
let nep_x;
let nep_y;
let plu_x;
let plu_y;

let pressed=false;

function setup() {
  createCanvas(displayWidth, displayHeight);
}


function draw() {
  background(0);
  if(drawPlanets){
    earth_x=displayWidth/2;
    earth_y=displayWidth/2;
    fill(0,0,255);
    ellipse(earth_x, earth_y, 100, 100);
  }
}

function mousePressed(){
  if(mouseX>earth_x-25 && mouseX<earth_x+25){
    earth_y=mouseY;
    pressed=true;
  }
  print(mouseX, mouseY);
}

function mouseDragged(){
  if(pressed){
    earth_y=mouseY;
  }
}

function mouseReleased(){
  pressed=false;
}