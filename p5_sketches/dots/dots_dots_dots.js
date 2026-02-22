/*
* Title: Homework 5 Dots dots dots
* Author: Rebecca Sheng
* Date:  SP 2026
* Simple Description: Display dots and cards doing bouncing animation that starts at random locations. The dots have random colors.
* Instructions: Click one of two modes to change what to display, cards or dots. Use play again button to rechoose the display. 
*/

let dots = [];
let color_init = []
let x_init = []
let y_init = []
let dot_num = 1
let card_l = 75
let card_h = 105
let corner_round = card_l/20
let mode = 0
let num_frame = 0
let cnv_x = 0
let cnv_y = 0
function setup() {
  cnv = createCanvas(600, 600);

  
  colorMode(HSB)
  cnv_x = cnv.position().x
  cnv_y = cnv.position().y
  
  //print(cnv.position());
  // Place the initial buttons to choose between dots and card
  let button_dots = createButton('Dots');
  let button_cards = createButton('Cards');
  button_dots.position(cnv_x + 50, cnv_y + 300);
  button_cards.position(cnv_x + 400, cnv_y + 300);
  button_dots.style('width', '150px');
  button_dots.style('height', '50px');
  button_cards.style('width', '150px');
  button_cards.style('height', '50px');
  button_cards.mousePressed(choose_cards);
  button_dots.mousePressed(choose_dots);
  
  // Initialize the particles
  let r = random(25, 40)
  let accl_re= random(0.05, 0.2)
  let card_color = (100, 0, 100)
  
  for (let i = 0; i < dot_num; i++) {
    color_init[i] = color(random(255, 360), 100, random(80, 100))
    x_init[i] = random(r, width/2)
    y_init[i] = random(r, height/2)
    dots.push(new Particle(x_init[i], y_init[i], r, accl_re, color_init[i]));
  }
}

function draw() {
  background(100, 100, 50);
  colorMode(HSB)
  angleMode(DEGREES)
/*
  push()
  fill(100, 100, 0);
  textSize(40);
  textAlign(CENTER, TOP);
  text("Dots and poker", width/2, 10);
  pop()
*/
  // In dot mode, display dots
  if(mode == 1){
    for(i = 0; i < dots.length; i ++){
      dots[i].show(mode);
      dots[i].update();
      num_frame ++
    }
    // Display play again button after 100 frames
    if(num_frame > 100){
    let button_again = createButton('Play Again')
    button_again.position(cnv_x + 200, cnv_y + 50);
    button_again.style('width', '150px');
    button_again.style('height', '50px');
    button_again.mousePressed(choose_again)
    }
  }
  // In card mode, display ace card
  else if(mode == 2){
      for(i = 0; i < dots.length; i ++){
        dots[i].show(mode);
        dots[i].update();   
        num_frame ++
      }
    // Display play again button after 100 frames
    if(num_frame > 100){
        let button_again = createButton('Play Again')
        button_again.position(cnv_x + 200, cnv_y + 50);
        button_again.style('width', '150px');
        button_again.style('height', '50px');
        button_again.mousePressed(choose_again)
      }
  }
  // If no mode is chosen, display the two mode buttons
  else{
    let button_dots = createButton('Dots');
    let button_cards = createButton('Cards');

    button_dots.position(cnv_x +50, cnv_y + 300);
    button_cards.position(cnv_x + 400, cnv_y + 300);
    button_dots.style('width', '150px');
    button_dots.style('height', '50px');
    button_cards.style('width', '150px');
    button_cards.style('height', '50px');
    button_cards.mousePressed(choose_cards);
    button_dots.mousePressed(choose_dots);
  }
}

// When play again button is pressed, display the two mode buttons and re-initialize the particles
function choose_again(){
  noLoop()
  clear()
  dots = [];
  color_init = []
  x_init = []
  y_init = []
  let r = random(25, 40)
  let accl_re= random(0.05, 0.2)
  let card_color = (100, 0, 100)
  //let dots = new Particle(random(r, width/2), random(r, height/2), r, accl_re)
  
  for (let i = 0; i < dot_num; i++) {
    color_init[i] = color(random(255, 360), 100, random(80, 100))
    x_init[i] = random(r, width)
    y_init[i] = random(r, height/2)
    dots.push(new Particle(x_init[i], y_init[i], r, accl_re, color_init[i]));
  }
  //loop()
  mode = 0
  num_frame = 0
}

function choose_cards(){
  mode = 1
  loop()
  removeElements()
}
function choose_dots(){
  mode = 2
  loop()
  removeElements()
}

// Draw ace card for card mode
function draw_card_ace(rect_x, rect_y, rect_l, rect_h){
  push()
  fill(100, 0, 100)
  rect(rect_x, rect_y, rect_l, rect_h, corner_round, corner_round, corner_round, corner_round)
  pop()
  //print('rect_x: ' + rect_x)
  let fill_heart = color(0, 100, 100)
  push()
  scale(0.2)
  fill(fill_heart)
  draw_heart_func((rect_x+75/2)/0.2, (rect_y + 105/2)/0.2)
  pop()
  push()
  stroke(255, 0, 0)
  fill(255, 0, 0)
  text('A', rect_x+10, rect_y +20)
  pop()
  push()
  translate(rect_x + rect_l/2, rect_y + rect_h/2)
  stroke(255, 0, 0)
  fill(255, 0, 0)
  rotate(180)
  text('A',-rect_l/2+10,-rect_h/2+20)
  pop()
}

// Draw the heart shape using the heart function
function draw_heart_func(shift_x, shift_y){
  beginShape()
  
  for(t = -180; t<180; t ++){
      let x = 5 * 16 * pow(sin(t), 3)
      let y = 5 *(-13 * cos(t) + 5 * cos(2 * t) + 2 * cos(3 * t) + cos(4 * t))
      vertex(x+shift_x, y+shift_y)
    }
  endShape()
}

// Particle system controls acceleration rate and velocity
class Particle{
  constructor(x, y, radius, accl_reduce, color_start) {
    this.x = x;
    this.y = y
    this.reset_num = 0
    let dice = random(0, 1)
    //print(dice)
    if(dice < 0.5){
      this.vel_x = random(-3, -1.5);
    }
    else{
      this.vel_x = random(1.5, 3)
    }
    
    this.vel_y = 2;
    this.accl_x = 0;
    this.accl_y = 0.2
    this.history = [];
    this.radius = radius
    this.accl_reduce = accl_reduce
    this.fill_color = color_start
  }
  update() {
    this.x = this.x + this.vel_x;
    this.y = this.y + this.vel_y;
    this.vel_x += this.accl_x;
    this.vel_y += this.accl_y;
    let v = createVector(this.x, this.y);
    //print('reset num: ' + this.reset_num + ' y velocity: ' + this.vel_y + ' x coord: ' + this.x)
    this.history.push(v);
       
    if(this.y > height - this.radius){
       this.vel_y = -this.vel_y
      this.accl_y += this.accl_reduce
       }
    if(this.y < this.radius){
      this.vel_y = -this.vel_y
    }
    if(this.x > width|| this.x < 0){
      this.y = random(this.radius, height/2);
      this.x = random(this.radius, width/2)
      let dice = random(0, 1)
      if(dice< 0.5){
        this.vel_x = random(-3, -1.5);
      }
      else{
        this.vel_x = random(1.5, 3);
      }
      this.vel_y = 2
      this.accl_y = 0.2
      this.reset_num += 1
    }
    
  }
  
  show(mode) {
    if(mode == 1){
    stroke(255, 0, 0);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      if(i%2 == 0){
      let pos = this.history[i];
      draw_card_ace(pos.x, pos.y, card_l, card_h)
      endShape();
      }
    }

    noStroke();
    fill(this.fill_color);
    push()
    draw_card_ace(this.x, this.y, card_l, card_h)
    pop()
    }
    
    else if(mode == 2){
    stroke(255, 0, 0);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      if(i%2 == 0){
      let pos = this.history[i];
      ellipse(pos.x, pos.y, this.radius, this.radius);
      endShape();
      }
    }

    noStroke();
    fill(this.fill_color);
    ellipse(this.x, this.y, this.radius, this.radius);

    }
  }

}