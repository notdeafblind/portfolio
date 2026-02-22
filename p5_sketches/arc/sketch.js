/*
* Title: Homework 1 Landscape of code
* Author: Rebecca Sheng
* Date:  Jan. 2026
* Simple Description: Draws star trails with arcs and mountains on the bottom.
* Instructions: Execute the code to start the moving star trails.
*/

const PI = Math.PI;
const num_trails = 80;  //Total number of star trails
const center_x = 200;   //Canvas center
const center_y = 200;
const w = 20;           //Radius of the center trail
const w_inter = 8;
const angle1_init = [];
const angle2_init = [];
let angle1 = [];
let angle2 = [];
let stroke_w = [];
let stroke_c = [];
let speed_vary = [];

function setup() {
  colorMode(HSB);
  createCanvas(400, 400);
  describe('Generate background color gradient by blending the given colors')
  //frameRate(20);
  angleMode(DEGREES);

  //Randomly decide arc starting angle and color
  for (let i = 0; i < num_trails; i += 1) {                             //Generate random parameters for each arc or trail
    angle1_init[i] = random(0, 180);                                         //Select random arc starting angle
    angle1[i] = angle1_init[i];
    angle2_init[i] = angle1_init[i] + 30;
    angle2[i] = angle2_init[i];
    stroke_w[i] = random(0, 1.5);                                       //Select random stroke weight
    speed_vary[i] = random(0.2, 0.5);                                   //Select random drawing speed
    if (random(1) < 0.5) {
      stroke_c[i] = [random(188, 220), random(10, 20), random(80, 90)]; //Select random color from blue
    } else if (random(1) > 0.7) {
      stroke_c[i] = [random(40, 60), random(10, 20), random(80, 90)];   //Select random color from yellow
    } else {
      stroke_c[i] = [100, 0, 100]; //White color
    }
  }
  describe('Randomly select parameters for the star rials drwan with arcs')

}

function draw() {
  // Create background gradient color in HSB space
  let c1 = color(235, 100, 30);
  let c2 = color(235, 50, 100);
  for (let i = 0; i < 400; i += 1) {
    let inter = map(i, 0, 400, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, 400, i);
  }


  
  // Draw the star trails with arcs
  noFill();
  for (let i = 0; i < num_trails; i ++) {
    strokeWeight(stroke_w[i]);                                           //Random stroke weight for each arc
    stroke(stroke_c[i]);                                                 //Random blue, yellow, or white for each arc
    arc(center_x, center_y, w + i * w_inter, w + i * w_inter, angle1[i], angle2[i]) //Draw arcs with an interval of 8 pixels
    if (angle2[i] < 360 + angle1[i]) {
      angle2[i] += speed_vary[i];
      angle1[i] += speed_vary[i] / 2;
    }
    else{
      angle2[i] = angle2_init[i];
      angle1[i] = angle1_init[i];
    }
  }
  push()
        // Draw the mountains and shadows.
  let deep_blue = [225, 88, 50];     //shadow color
  let light_blue = [225, 30, 100];   //mountain color
  let horizon_y = 350;

  fill(deep_blue)
  stroke(223, 35, 82);
  strokeWeight(4)
  rect(0, horizon_y, width, height-horizon_y)
  beginShape();
  noStroke();
  fill(280, 35, 50)
  vertex(190, 350, 0)
  vertex(210, 350, 0)
  vertex(330, 400, 0)
  vertex(70, 400, 0)
  endShape(CLOSE);
  
  stroke(280, 50, 60)
  strokeWeight(3)
  line(30, 400, 190, 350)
  stroke(280, 50, 60)
  strokeWeight(3)
  line(370, 400, 210, 350)
  
  stroke(280, 50, 60)
  strokeWeight(2)
  line(70, 400, 70, 390)
  line(100, 390, 100, 379)
  line(130, 378, 130, 369)
  line(160, 365, 160, 360)
  
  line(330, 400, 330, 390)
  line(300, 390, 300, 379)
  line(270, 378, 270, 369)
  line(240, 365, 240, 360)
  pop()
  push()
  drawMountain(deep_blue, [0, horizon_y, 0], [80, horizon_y-60, 0], [150, horizon_y, 0]);
  drawMountain(deep_blue, [0, horizon_y, 0], [200, horizon_y-100, 0], [300, horizon_y, 0]);
  drawMountain(light_blue, [150, horizon_y, 0], [200, horizon_y-100, 0], [300, horizon_y, 0]);
  drawMountain(deep_blue, [200, horizon_y, 0], [300, horizon_y-30, 0], [400, horizon_y, 0]);
  drawMountain(light_blue, [280, horizon_y, 0], [300, horizon_y-30, 0], [400, horizon_y, 0]);
  describe('Starting drawing trails with given starting angle, stroke weight, stroke color, and speed')

  pop()
  

  describe("Star trails above snowy mountains");
}

function drawMountain(c, pt1, pt2, pt3) {
  // Draw and fill shape with given colors and coordinates
  beginShape();
  fill(c[0], c[1], c[2]);
  strokeWeight(0);
  vertex(pt1[0], pt1[1], pt1[2]);
  vertex(pt2[0], pt2[1], pt2[2]);
  vertex(pt3[0], pt3[1], pt3[2]);
  endShape(CLOSE);
  describe('Draw a shape wiht 3 points and fill with input colors')
}
