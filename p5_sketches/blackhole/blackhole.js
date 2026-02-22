/*
* Title: Homework 4 Simple form generator
* Author: Rebecca Sheng
* Date:  Feb 2026
* Simple Description: There are two parts, a planet and a blackhole. The planet is interactive while the blackhole stands still. The background is filled with randomly generated stars.
* Instructions: User can drag the planet to the center of the blackhole and the planet will deform.
*/
const particles = [];
const a = 100
const b = 275
let particle_alpha = []
let star_num = 500    // Random background star number
let star_x = []       // Random star location
let star_y = []
let star_r = []       // Random star radius
let star_h = []       // Random star color
let star_s = []
let star_b = []
let star_alpha = []
let color_scale = 1
let color_num = 10
let arc_num = 100
let circ_scale_x = 1
let circ_scale_y = 1
let grabbed = 0
let circ_r = 50
let shape_x = 0
let shape_y = 275
let noiseLevel = 20;
let noiseScale = 0.01;
let c = []
let inter = 1
let gradient_c = []
let arc_b = [] //random(50, 70)
let arc_r = [] //random(280, 350)
let arc_angle1 = [] //random(0, 360)
let arc_angle2 = [] //arc_angle1 + random(1, 3)
let random_x =[]  
let random_y =[]
let random_alpha = []
let c_x = 0
let c_y = 100
let circ_scale_x2 = 1
let circ_scale_y2 = 1
let grabbed2 = 0
let circ_r2 = 30
let shape_x2 = 0
let shape_y2 = 0
let cnv_x = 0
let cnv_y = 0
function setup() {
  cnv = createCanvas(600, 600);
  cnv_x = cnv.position().x
  cnv_y = cnv.position().y

  

  translate(width / 2, height / 2)
  colorMode(HSB)
  angleMode(DEGREES)
  
  
  for(let i = 0; i<1000; i++){
    random_x[i] = random(-300, 300)
    random_y[i] = random(-300, 300)
    random_alpha[i] = random(0, 0.6)
  }
  let c1_circle3 = color(230, 28, 20);
  let c2_circle3 = color(230, 20, 15);

  for (let i = 350; i < 370; i += 1) {
    inter = map(i, 350, 370, 0, 1);
    gradient_c[i] = lerpColor(c1_circle3, c2_circle3, inter);
  }
  for(let i = 0; i < arc_num; i++){
    arc_b[i] = random(50, 70)
    arc_r[i] = random(280, 350)
    arc_angle1[i] = random(0, 360)
    arc_angle2[i] = arc_angle1[i] + random(1, 3)
  }
  
  
  push()
  // Draw noise cloud
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      // Scale the input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      c[y*100 + x] = noiseLevel * noise(nx, ny);
    }
  }
  pop()
  
  // Generate random dot as starry background
  for(let i= 0; i < star_num; i ++){
    star_x[i] = random(-300, 300)
    star_y[i]  = random(-300, 300)
    star_r[i]  = random(1, 3)
    star_h[i]  = random(30, 230)
    star_s[i]  = random(20, 50)
    star_b[i]  = random(50, 80)
    star_alpha[i] = random(100,255)
  }
}

function draw() {
  background(230, 20, 15);
  translate(width / 2, height / 2)
  colorMode(HSB)
  angleMode(DEGREES)

  
  // Draw background random cloud
  push()
  let noise_c = color(230, 100, 100)
  for(let i= 0; i< 1000; i ++){
    //c.setAlpha(random_alpha[i]);
    fill(28,40,30, 0.01)  // Also set alpha value in HSB space
    noStroke()
    circle(random_x[i], random_y[i], 40)
  }
  pop()
  

  // Draw random stars at random locations in the background
  push()
  noStroke()
  fill(0, 100, 0)
  for(i = 0; i <star_num; i++){
    fill(star_h[i], star_s[i], star_b[i], star_alpha[i])
    circle(star_x[i], star_y[i], star_r[i])
  }
  pop()
  
  
  //Draw background distortion discs
  push()
  noStroke()
  fill(230, 28, 20)
  circle(0, -10, 370)
  pop()

  noStroke()
  for (let i = 350; i < 370; i += 1) {
    stroke(gradient_c[i]);
    strokeWeight(2)
    noFill()
    //color_scale = map(i, 305, 350, 0.975, 1)
    //scale(color_scale)
    circle(0, -10, i)
  }
/*
  push()
  fill(100, 0, 100);
  textSize(50);
  textAlign(CENTER, TOP);
  text("Blackhole Simulator", 0,-350);
  pop()
*/
  push()
  noStroke()
  fill(215, 50, 30)
  circle(0, -10, 350)
  pop()

  push()
  
  // Disk gradient colors
  let c1_circle = color(230, 28, 15);
  let c2_circle = color(215, 30, 30);
  noStroke()
  for (let i = 305; i < 350; i += 1) {
    let inter = map(i, 305, 350, 0, 1);
    let c = lerpColor(c1_circle, c2_circle, inter);
    stroke(c);
    strokeWeight(2)
    noFill()
    //color_scale = map(i, 305, 350, 0.975, 1)
    //scale(color_scale)
    circle(0, -10, i)
  }
  pop()
  
  push()
  stroke(230, 20, 15)
  strokeWeight(1)
  noFill()
  circle(0, -10, 300)
  pop()
  
  push()
  let c1_circle2 = color(230, 28, 15);
  let c2_circle2 = color(215, 50, 30);
  noStroke()
  for (let i = 250; i < 305; i += 1) {
    let inter = map(i, 250, 305, 0, 1);
    let c = lerpColor(c2_circle2, c1_circle2, inter);
    stroke(c);
    strokeWeight(2)
    noFill()
    circle(0, -10, i)
  }
  pop()
  
  // Draw distorted stars as arcs
  push()
  strokeWeight(1)
  noFill()
  for(let i = 0; i < arc_num; i++){
    stroke(100, 0, arc_b[i] , 10)
    arc(0, -10, arc_r[i] , arc_r[i] , arc_angle1[i] , arc_angle2[i] )
  }
  pop()
  
  /*
  // Draw animated distorted stars
  push()
  strokeWeight(1)
  noFill()
  let r = random(280, 350)
  let angle1 = random(0, 360)
  for(let i = 0; i < arc_num; i++){
    stroke(100, 0, random(50, 70) , 10)
    arc(0, -10, r , r , angle1 , angle1 + random(1, 3) )
  }
  pop()
  */
  // Draw outer disks
  push()
  strokeWeight(5)
  noStroke()
  fill(30, 70, 30)
  draw_outest_curve()
  pop()
  

  // Draw gradient colors for outer rings
  push()
  let c1_outest = color(30, 60, 30);
  let c2_outest = color(30, 40, 70);
  noStroke()
  for (let i = 0; i < color_num; i += 1) {
    let inter = map(i, 0, color_num, 0, 1);
    let c = lerpColor(c1_outest, c2_outest, inter);
    fill(c);
    color_scale = map(i, 0, color_num, 0.975, 1)
    scale(color_scale)
    draw_outest_curve()
  }
  pop()
  
  push()
  fill(230, 20, 100)
  noStroke()
  draw_outer_curve()

  pop()
  
  
  
  push()
  let c1_out = color(230, 20, 100);
  let c2_out = color(230, 10, 100);
  noStroke()
  for (let i = 0; i < color_num; i += 1) {
    let inter = map(i, 0, color_num, 0, 1);
    let c = lerpColor(c1_out, c2_out, inter);
    fill(c);
    color_scale = map(i, 0, color_num, 0.9, 1)
    scale(color_scale)
    draw_outer_curve()
  }
  pop()
  
  // Animate the ring outline
  push()
  stroke(226, 30, 60)
  noFill()
  
  drawingContext.save();
  push()
  noStroke()
  stroke(100, 0, 100,0)
  arc(0, 0, 400, 400, frameCount*2, frameCount*2 + 45, PIE)
  pop()
  drawingContext.clip();
  push()
  scale(0.8)
  strokeWeight(4)
  draw_outer_curve_notri()
  pop()
  drawingContext.restore(); 
  pop()
  
  push()
  stroke(220, 30, 40)
  noFill()
  
  drawingContext.save();
  push()
  noStroke()
  stroke(100, 0, 100,0)
  arc(0, 0, 450, 450, frameCount*3+60, frameCount*3 + 120, PIE)
  pop()
  drawingContext.clip();
  push()
  scale(0.85)
  strokeWeight(3)
  draw_outer_curve_notri()
  pop()
  drawingContext.restore(); 
  pop()
  
  push()
  stroke(220, 30, 20)
  noFill()
  
  drawingContext.save();
  push()
  noStroke()
  stroke(100, 0, 100,0)
  arc(0, 0, 400, 400, frameCount*2.5+210, frameCount*3 + 240, PIE)
  pop()
  drawingContext.clip();
  push()
  scale(0.7)
  strokeWeight(2)
  draw_outer_curve_notri()
  pop()
  drawingContext.restore(); 
  pop()
  
  
  //Draw blackhole center
  push()
  fill(230, 40, 80)
  noStroke()
  draw_inner_curve()
  pop()
  
  push()
  noStroke()
  fill(100, 100, 0, 100)
  scale(0.9)
  draw_inner_curve()
  pop()
  
  /*push()
  fill(30, 60, 10, 100)
  noStroke()
  rect(-300, 80, 600, 50)
  pop()
*/

  push()
  let c1_rect = color(30, 40, 70);
  let c2_rect = color(30, 60, 10);
  noFill()
  for (let i = 30; i < 80; i += 1) {
    let inter = map(i, 30, 80, 0, 1);
    let expand = map(i, 30, 80, 0, 50)
    let c = lerpColor(c1_rect, c2_rect, inter);
    stroke(c);
    strokeWeight(5)
    arc(0, i, 560+expand, 50, 0, 180)
  }
  for (let i = 80; i < 120; i += 1) {
    let inter = map(i, 80, 120, 0, 1);
    let expand = map(i, 30, 80, 0, 50)
    let c = lerpColor(c1_rect, c2_rect, inter);
    stroke(30, 60, 10);
    strokeWeight(5)
    arc(0, i, 600, 50, 0, 180)
  }
  pop()
  
  push()
  noFill()
  stroke(30, 40, 70)
  strokeWeight(5)
  arc(0, 30,  560, 40, 0, 180)
  pop()
  
  // Make circle transform as it comes closer to the blackhole
  
  // Draw planet orbit
  
  push()
  noStroke()
  fill(100, 100, 0)
  
  let angle = atan2(shape_x*(1/circ_scale_x), shape_y*(1/circ_scale_y))
  push()
  strokeWeight(5)
  noFill()
  stroke(100, 0, 100)
  ellipse(0, 0, 200, 550)
  pop()
  
  translate(shape_x, shape_y)
  rotate(-angle)
  scale(circ_scale_x, circ_scale_y)
  
  circle(0, 0, circ_r *2)
  clip(mask)
  //let c1 = color(255, 100, 100);
  let p_c1 = color(350, 100, 100)
  let p_c2 = color(255, 100, 100)
  let p_c21 = color(320, 40, 100)
  let p_c22 = color(230, 60, 100)
  let c_inter = map(dist(shape_x, shape_y, 0, 0), a, b, 0, 1)
  //print(dist(shape_x, shape_y, 0, 0))
  let c1 = lerpColor(p_c1, p_c2, c_inter)
  let c2 = lerpColor(p_c21, p_c22, c_inter);

  for (let i = 0; i < 80; i += 1) {
    let inter = map(i, 0, 80, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    strokeWeight(2)
    arc(0, 80, 270-i, 270-i, 180, 90);
  }
  
  for (let i = 80; i < 220; i += 1) {
    let inter = map(i, 80, 220, 0, 1);
    let c = lerpColor(c2, c1, inter);
    stroke(c);
    strokeWeight(2)
    arc(0, 80, 270-i, 270-i, 180, 90);
  }
  
  pop()
  
  push()
  noStroke()
  fill(100, 100, 0)
  let angle2 = atan2(shape_x2*(1/circ_scale_x2), shape_y2*(1/circ_scale_y2))
  translate(shape_x2, shape_y2)
  rotate(-angle2)
  scale(circ_scale_x2, circ_scale_y2)
  
  circle(0, 0, circ_r2 *2)
  clip(mask2)
  push()
  fill(200, 5, 80)
  noStroke()
  circle(0, 0, circ_r2 *2)
  pop()
  
  push()
  fill(200, 5, 60)
  circle(-10, 10, 68)
  pop()
  
  push()
  fill(200, 5, 50)
  circle(-20, 20, 65)
  pop()
  
  push()
  fill(200, 5, 40)
  circle(-20, 20, 45)
  pop()
  
  push()
  fill(200, 5, 40)
  circle(5, -5, 15)
  pop()
  push()
  stroke(200, 5, 80)
  strokeWeight(2)
  noFill()
  arc(5, -5, 15, 15, -120, 60)
  pop()
  
  push()
  fill(200, 5, 40)
  circle(-18, -20, 10)
  pop()
  push()
  stroke(200, 5, 80)
  strokeWeight(2)
  noFill()
  arc(-18, -20, 10, 10, -120, -20)
  pop()
  
  push()
  fill(200, 5, 40)
  circle(-18, 0, 12)
  pop()
  push()
  stroke(200, 5, 30)
  strokeWeight(2)
  noFill()
  arc(-18, 0, 12, 12, 10, -150)
  pop()
  
  push()
  fill(200, 5, 40)
  circle(0, 15, 8)
  pop()
  push()
  stroke(200, 5, 30)
  strokeWeight(2)
  noFill()
  arc(0, 15, 8, 8, 60, -120)
  pop()
  
  pop()
  
  if((dist(shape_x, shape_y, mouseX-width/2, mouseY-height/2)<circ_r*circ_scale_x) || 
     (dist(shape_x2, shape_y2, mouseX-width/2, mouseY-height/2)<circ_r2*circ_scale_x2)){
     cursor('grab')
     }
  else{
    cursor(ARROW)
  }
  if(dist(shape_x2, shape_y2, 0, -10) < 150){
    for (let i = 0; i < 10; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
        // remove this particle
        particles.splice(i, 1);
      }
    }
  }
  
  
}

class Particle {

  constructor() {
    this.x = shape_x2;
    this.y = shape_y2;
    let random_interval_x = map(dist(this.x, this.y, 0, -10), 0, 150, 1, 10)
    let random_interval_y = map(dist(this.x, this.y, 0, -10), 0, 150, 1, 15)
    this.vx = random(-random_interval_x, 1);
    this.vy = random(random_interval_y-10, 10-random_interval_y);
    this.alpha = 1;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    let alpha_inter = map(dist(this.x, this.y, 0, -10), 0, 150, 0.01, 0.08)
    this.alpha -= alpha_inter;
  }

  show() {
    noStroke();
    //stroke(255);
    let particle_c1 = color(50, 60, 80)
    let particle_c2 = color(225, 0, 100)
    let particle_c_inter = map(dist(this.x, this.y, 0, -10), 0, 150, 0, 1)
    let color_inter = lerpColor(particle_c2, particle_c1, particle_c_inter)
    fill(color_inter, this.alpha);
    let particle_r = map(dist(this.x, this.y, 0, -10), 0, 150, 5, 25)
    ellipse(this.x, this.y, 25-particle_r);
  }

}

function mask() {
  circle(0, 0, circ_r*2)
}
function mask2() {
  circle(0, 0, circ_r2*2)
}

function mousePressed(){
  if(dist(mouseX-width/2, mouseY-height/2, shape_x, shape_y)<circ_r){
    grabbed = 1
  }
  if(dist(mouseX-width/2, mouseY-height/2, shape_x2, shape_y2)<circ_r2){
    grabbed2 = 1
  }
}

function mouseReleased(){
  grabbed = 0
  grabbed2 = 0
}

function mouseDragged(){
  push()
  rotate(60)
  if(grabbed){
    shape_x = mouseX-width/2
    shape_y = mouseY-height/2
    if(abs(mouseX-width/2) > a && mouseX < width/2){
      shape_x = -a
    }
    else if(abs(mouseX-width/2) > a && mouseX > width/2){
      shape_x = a
    }
    else{
    shape_x = mouseX-width/2
  }
    shape_y = (b/a) * sqrt(sq(a) - sq(shape_x))
  if(mouseY - height/2 < 0){
    shape_y = -shape_y
  }
    let circ_dist = dist(shape_x, shape_y, 0, 0)
    circ_scale_x = map(circ_dist, 0, dist(0, 0, -250, -250), 0.05, 1)
    if(dist(shape_x, shape_y, 0, 0) <= 50){
      circ_scale_y = map(circ_dist, 0, dist(0, 0, -50, -50), 0.05, 1)
    }
    else{
      circ_scale_y = 1
    }
    
  }
  pop()
  
  push()
  if(grabbed2){
    shape_x2 = mouseX-width/2
    shape_y2 = mouseY-height/2
    let circ_dist2 = dist(mouseX-width/2, mouseY-height/2, 0, 0)
    circ_scale_x2 = map(circ_dist2, 0, dist(0, 0, -250, -250), 0.05, 1)
    if(dist(shape_x2, shape_y2, 0, 0) <= 50){
      circ_scale_y2 = map(circ_dist2, 0, dist(0, 0, -50, -50), 0.05, 1)
    }
    else{
      circ_scale_y2 = 1
    }
    
  }
  pop()
}

function draw_inner_curve(){
  beginShape()
  vertex(80, 0)
  //controlpoint1:30, 0, controlpoint2: 370, 0
  //controlpoint3: 20, 220
  bezierVertex(70, -100, -70, -100, -80, 0)
  vertex(-80, 0)
  bezierVertex(-100, 10, -100, 15, 0, 15)
  vertex(0, 15)
  bezierVertex(100, 15, 100, 10, 80, 0)
  endShape()
}

function draw_outer_curve(){
  // Draw outer ring
  beginShape()
  vertex(140, 0)
  bezierVertex(100, -150, -100, -150, -140, 0)
  vertex(-140, 0)
  bezierVertex(-300, 40, -250, 40, 0, 50)
  vertex(0,50)
  bezierVertex(250, 40, 300, 40, 140, 0)
  endShape()
  triangle(-100, 20, -110, -60, -180, 10)
  triangle(100, 20, 110, -60, 180, 10)
}

function draw_outer_curve_notri(){
  // Draw outer ring
  beginShape()
  vertex(140, 0)
  bezierVertex(100, -150, -100, -150, -140, 0)
  vertex(-140, 0)
  bezierVertex(-300, 40, -250, 40, 0, 50)
  vertex(0,50)
  bezierVertex(250, 40, 300, 40, 140, 0)
  endShape()
}

function draw_outest_curve(){
  beginShape()
  vertex(160, -30)
  bezierVertex(80, -180, -80, -180, -160, -30)
  vertex(-160, -30)
  bezierVertex(-450, 60, -320, 40, 0, 60)
  vertex(0, 60)
  bezierVertex(320, 40, 450, 60, 160, -30)
  triangle(-100, -10, -100, -100, -200, -5)
  triangle(100, -10, 100, -100, 200, -5)
  endShape()
}



  /*
  push()
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      stroke(c[y*100 + x]);
      scale(6)
      circle(x*6-300, y*6-300, 2);
    }
  }
  
  pop()
  */