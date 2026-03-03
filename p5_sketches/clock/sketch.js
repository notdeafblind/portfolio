/*
* Title: Homework 7 Super Simple Clock
* Author: Rebecca Sheng
* Date:  SP 2026
* Simple Description: This code displays a clock. The hour, minute and second can be read from the red segments of the shape. There are two modes for system time and custom time. Light rays from the shape will change based on the hour. The clock shape will change based on window size. 
* Instructions: Run the code to select one of two modes, system time or custom time. In system time, the time is displayed based on current system time. On custom mode, user can enter the hour they would like to see. The minute and seconds will be displayed as system time. In both modes, press the center button to return to title page and select mode again. 
*/

let font;
let sentence = "selectagain";
let sentenceArray = [];
let r;
let theta = 0;

let l = 0;
let h = 0;
let window_num = 12;
let outer_line_num = 150;
let outer_line_length = [];
let button_again;

//For ray of light
let cy, px, py;
let h_light = 400;
let nx = 0;
let light_start_y;
let light_width = 200;
let gpu_mode = 1;
let light_mode;
let light_radius = 100;

let fade = 0.1;
let fadeAmount = 0.01;
let hourInput;
let time_mode = 0;
let last_y_range = [];
let timeLastUpdated = Date.now();

let button_show = false;

const TIME_BETWEEN_RANDOMIZATIONS = 100;

function preload() {
  font = loadFont("Lavish.ttf");
  font2 = loadFont("EagleLake.ttf");
  font3 = loadFont("fireSans.ttf");
}

function setup() {
  sentenceArray = sentence.split("");
  r = windowWidth / 25;
  if (gpu_mode) {
    createCanvas(windowWidth, windowHeight, WEBGL);
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  //print(windowHeight)
  l = windowWidth;
  h = windowHeight;
  cy = height / 2;
  px = 0;
  py = cy;
  for (i = 0; i < outer_line_num; i++) {
    outer_line_length[i] = random(20, 80);
  }
  frameRate(25);
}

function draw() {
  background(0);
  colorMode(HSB);
  angleMode(DEGREES);
  //translate(l/2, h/2)

  if (time_mode == 0) {
    // Title mode
    textFont(font);
    textSize(l / 10);
    textAlign(CENTER);
    fill(255, 0, 100, fade);
    text("The Clock", 0, -50);
    if (fade < 0) fadeAmount = 0.015;

    if (fade > 1) fadeAmount = -0.015;

    fade += fadeAmount;
    let button_system = createButton("System Time");
    let button_custom = createButton("Custom Time");

    button_custom.position((4 * width) / 5 - 75, height / 2);
    button_system.position(width / 5 - 75, height / 2);
    button_system.style("width", "150px");
    button_system.style("height", "50px");
    button_custom.style("width", "150px");
    button_custom.style("height", "50px");
    button_system.mousePressed(system_time);
    button_custom.mousePressed(custom_time);
  } else if (time_mode == 2) {
    // Custom time mode
    textFont(font);
    textSize(l / 10);
    textAlign(CENTER);
    fill(255, 0, 100, fade);
    text("Enter custom hour", 0, -50);
    if (fade < 0) fadeAmount = 0.015;

    if (fade > 1) fadeAmount = -0.015;

    fade += fadeAmount;
    let button_confirm = createButton("Confirm");
    button_confirm.position(width / 2 - 75, height / 2 + 100);
    button_confirm.style("width", "150px");
    button_confirm.style("height", "50px");
    button_confirm.mousePressed(custom_hour);
  } else if (time_mode == 3) {
    
    let hour_value = hourInput.value();
    button_again = createButton("Again");
    button_again.position(l / 2 - l / 50, h / 2 - 20);
    button_again.style("width", "40px");
    button_again.style("height", "40px");
    button_again.hide();
    if (dist(mouseX - l / 2, mouseY - h / 2, 0, 0) < l / 25) {
      button_again.show();
      //button_show = true
    }
    //button_again.mouseOver(toggle_button);
    button_again.mousePressed(choose_again);
    draw_clock(hour_value);
    draw_circle();
    fill(100, 0, 100);
    textAlign(CENTER);
    textSize(23);
    textFont(font3);
    let text_x = r * cos(theta);
    let text_y = r * sin(theta);
    for (let i = 0; i < sentenceArray.length; i++) {
      rotate(360 / sentenceArray.length);
      text(sentenceArray[i], text_x, text_y);
    }
  } else {
    button_again = createButton("Again");
    button_again.position(l / 2 - l / 50, h / 2 - 20);
    button_again.style("width", "40px");
    button_again.style("height", "40px");
    button_again.hide();
    if (dist(mouseX - l / 2, mouseY - h / 2, 0, 0) < l / 25) {
      button_again.show();
      //button_show = true
    }
    //button_again.mouseOver(toggle_button);
    button_again.mousePressed(choose_again);
    draw_clock(hour());
    draw_circle();
    fill(100, 0, 100);
    textAlign(CENTER);
    textSize(23);
    textFont(font3);
    let text_x = r * cos(theta);
    let text_y = r * sin(theta);
    for (let i = 0; i < sentenceArray.length; i++) {
      rotate(360 / sentenceArray.length);
      text(sentenceArray[i], text_x, text_y);
    }
  }
}
function toggle_button() {
  if (button_show) {
    button_again.show();
  }
  button_show = false;
}

function choose_again() {
  removeElements();
  //noLoop()
  clear();
  time_mode = 0;
}

function draw_circle() {
  let circle_window_color = color(180, 16, 100);
  push();
  noStroke();
  //center circle
  fill(circle_window_color);
  circle(0, 0, l / 25);
  pop();
}

function draw_clock(hour_value) {
  draw_windows();

  //Draw hour, minute and second
  draw_time(hour_value);

  //Draw ray of light
  draw_light(hour_value);
}

function custom_hour() {
  time_mode = 3;
  removeElements();
}

function draw_windows() {
  let outer_deco_color = color(190, 40, 100);
  let outer_line_color = color(57, 52, 70);
  let inner_window_color = color(48, 15, 100);
  let inner_curve_window_color = color(220, 50, 100);
  let outer_window_color = color(220, 36, 100);
  let insert_window_color = color(200, 70, 100);
  push();
  noFill();
  stroke(outer_line_color);
  strokeWeight(5);
  //circle(0, 0, 9.5*l/10)
  for (i = 0; i < outer_line_num; i++) {
    rotate_angle = map(i, 0, outer_line_num, 0, 360);
    rotate(rotate_angle);
    line(0, l / 2.3, 0, l / 2.3 + outer_line_length[i]);
  }

  pop();

  push();
  //inner rectangular window
  noStroke();
  fill(inner_window_color);
  for (i = 0; i < window_num; i++) {
    glow(inner_window_color, 40);
    draw_inner_window();
    rotate(360 / 12);
  }
  pop();

  push();
  //stroke(100, 0, 100)
  noStroke();
  //strokeWeight(1)
  //noFill();
  fill(inner_curve_window_color);
  for (i = 0; i < window_num; i++) {
    rotate(360 / 12);
    glow(inner_curve_window_color, 20);
    draw_inner_curve_window();
    glow(inner_curve_window_color, 20);
    draw_inner_curve_window();
  }

  pop();

  push();
  //outer rectangular windows
  noStroke();
  fill(outer_window_color);

  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    glow(outer_window_color, 20);
    draw_outer_window();
    glow(outer_window_color, 20);
    draw_outer_window();
  }

  pop();

  push();
  fill(insert_window_color);
  noStroke();
  //stroke(100, 0, 100)
  //strokeWeight(2)

  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    glow(insert_window_color, 40);
    draw_insert_window();
    glow(insert_window_color, 40);
    draw_insert_window();
  }
  pop();

  push();
  fill(outer_deco_color);
  noStroke();
  //stroke(100, 0, 100)
  //strokeWeight(5)
  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    push();
    glow(outer_deco_color, 40);
    draw_diamond();
    glow(outer_deco_color, 40);
    draw_diamond();
    pop();
    //draw_outer_deco(-20)
    //draw_outer_deco(20)
    glow(outer_deco_color, 40);
    draw_outer_deco(40);
    glow(outer_deco_color, 40);
    draw_outer_deco(40);
    glow(outer_deco_color, 40);
    draw_outer_deco(-40);
    glow(outer_deco_color, 40);
    draw_outer_deco(-40);
  }
  pop();
  draw_circular_windows();
}

function draw_circular_windows() {
  let circle_window_color = color(180, 16, 100);
  push();
  //center circle
  fill(circle_window_color);
  circle(0, 0, l / 25);
  pop();

  push();
  stroke(100, 100, 0);
  strokeWeight(8);
  fill(circle_window_color);
  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);

    circle(0, -h / 3, l / 15);
  }

  pop();
  push();

  fill(circle_window_color);
  //Inner circular windows
  for (i = 0; i < window_num; i++) {
    strokeWeight(8);
    rotate(360 / 12);
    circle(0, l / 10, l / 25);
  }
  pop();
}

function draw_time(hour_value) {
  let hour_color = color(345, 70, 80);
  push();
  noStroke();
  sec_range = (second() - (second() % 5)) / 5;
  second_angle = map(sec_range, 0, 12, 0, 360);
  fill(hour_color);
  rotate(second_angle);
  draw_insert_window();
  pop();
  push();
  //Draw minute representation
  fill(hour_color);
  noStroke();
  minute_range = (minute() - (minute() % 5) + 5) / 5;
  minute_angle = map(minute_range, 0, 12, 0, 360);
  //print(minute_angle)
  rotate(minute_angle);
  glow(hour_color, 40);
  circle(0, -l / 10, l / 35);
  pop();

  push();
  //Draw hour representation
  fill(hour_color);
  noStroke();
  hour_angle = map(hour_value, 0, 12, 0, 360);
  rotate(hour_angle);
  circle(0, -h / 3, l / 19);
  pop();
}

function draw_light(hour_value) {
  let alpha = map(50, 0, width, 0.5, 0.8);
  let light_color1 = color(150, 0, 100, alpha / 15);
  let light_day_color = color(60, 20, 60, alpha / 12);
  let light_night_color = color(150, 0, 80, alpha / 1.8);
  let light_dawn_color = color(10, 20, 100, alpha / 12);
  push();
  //frameRate(30)
  h_light = 400;
  light_start_y = map(hour_value, 6, 18, -l / 4, l / 4);
  light_width = map(hour_value, 0, 12, 500, 200);
  if (hour_value >= 19 || hour_value <= 5) {
    push();
    //frameRate(10)
    let ray_num = 1000;

    if (Date.now() - timeLastUpdated > TIME_BETWEEN_RANDOMIZATIONS) {
      for (i = 0; i < ray_num; i++) {
        y_range = l / 4 + random(0, map(noise(i * 0.01, nx), 0, 1, 0, h_light));
        last_y_range[i] = y_range;
        fill(light_night_color);
        stroke(light_night_color);
        strokeWeight(2);

        push();
        rotate((i * 360) / ray_num);
        line(0, 0, 0, y_range);
        pop();
      }
      timeLastUpdated = Date.now();
    } else {
      for (i = 0; i < ray_num; i++) {
        //y_range = l/5 + random(0, map(noise(i*0.01,nx), 0, 1, 0, h_light))
        fill(light_night_color);
        stroke(light_night_color);
        strokeWeight(2);

        push();
        if (last_y_range[i]) {
          rotate((i * 360) / ray_num);
          line(0, 0, 0, last_y_range[i]);
        }

        pop();
      }
      //timeLastUpdated = Date.now();
    }
    pop();
  } else if (
    (hour_value > 5) & (hour_value < 8) ||
    (hour_value > 16) & (hour_value < 19)
  ) {
    light_mode = "dawn";
    for (let x = light_width; x < width - light_width; x += 1) {
      if (x % 2 == 0) {
        if (x == 0) {
          px = 0;
        }
        //print(cy)
        let y = cy + map(noise(x * 0.01, nx), 0, 1, 0, h_light);
        let depthGreen = map(noise(x * 0.05, nx), 0, 1, 20, h_light);
        let depthPink = map(
          noise(x * 0.1, nx),
          0,
          1,
          -h_light / 2,
          h_light * 1.5
        );

        stroke(light_color1);
        strokeWeight(5);
        line(0, 0, x - width / 2, y - depthPink);

        stroke(light_dawn_color);
        line(0, 0, x - width / 2, y - depthGreen);

        px = x;
        py = y;
      }
    }
    nx += 0.00005 * h_light;
  } else {
    light_mode = "day";
    for (let x = light_width; x < width - light_width; x += 1) {
      if (x == 0) {
        px = 0;
      }
      if (hour_value > 12) {
        light_start_y = 0;
      }
      //print(cy)
      let y = cy + map(noise(x * 0.01, nx), 0, 1, 0, h_light);
      let depthGreen = map(noise(x * 0.05, nx), 0, 1, 20, h_light);
      let depthPink = map(
        noise(x * 0.1, nx),
        0,
        1,
        -h_light / 2,
        h_light * 1.5
      );

      stroke(light_color1);
      strokeWeight(5);
      line(0, 0, x - width / 2, y - depthPink);

      stroke(light_day_color);
      line(0, 0, x - width / 2, y - depthGreen);

      px = x;
      py = y;
    }
    nx += 0.00005 * h_light;
  }

  pop();
}

function system_time() {
  time_mode = 1;
  //loop()
  removeElements();
}
function custom_time() {
  time_mode = 2;
  //loop()
  removeElements();
  hourInput = createInput();
  hourInput.position(width / 2 - 100, height / 2);
  hourInput.style("width", "200px");
  hourInput.style("height", "50px");
}

function draw_diamond() {
  let x1 = { x: 0, y: -h / 2.8 };
  let x2 = { x: -l / 80, y: -h / 2.5 };
  let x3 = { x: 0, y: -h / 2.2 };
  let x4 = { x: l / 80, y: -h / 2.5 };
  quad(x1.x, x1.y, x2.x, x2.y, x3.x, x3.y, x4.x, x4.y);
}
function draw_outer_deco(deco_angle) {
  push();
  translate(0, -h / 3);
  rotate(deco_angle);
  translate(0, h / 3);
  draw_diamond();
  pop();
}
function draw_insert_window() {
  push();
  rotate(15);
  beginShape();
  vertex(0, -h / 10);
  vertex(-l / 80, -h / 2.7);
  vertex(0, -h / 2);
  vertex(l / 80, -h / 2.7);
  vertex(0, -h / 10);
  endShape();
  pop();
}
function draw_outer_window() {
  // Outer rectangular window
  let p1 = { x: -l / 35, y: -h / 5.5 };
  // First Control Point
  let p2 = { x: -l / 45, y: -h / 5.2 };
  // Second Control Point
  let p3 = { x: -l / 45, y: -h / 5.2 };
  // Anchor Point
  let p4 = { x: -l / 100, y: -h / 5 };

  let q1 = { x: l / 35, y: -h / 5.5 };
  // First Control Point
  let q2 = { x: l / 45, y: -h / 5.2 };
  // Second Control Point
  let q3 = { x: l / 45, y: -h / 5.2 };
  // Anchor Point
  let q4 = { x: l / 100, y: -h / 5 };
  beginShape();
  // Specify the first anchor point
  vertex(p1.x, p1.y);
  // Specify the other points for bezierVertex()
  bezierVertex(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  vertex(-l / 100, -h / 2.87);
  vertex(-l / 20, -h / 2.87);
  vertex(p1.x, p1.y);
  endShape();

  beginShape();
  // Specify the first anchor point
  vertex(q1.x, q1.y);
  // Specify the other points for bezierVertex()
  bezierVertex(q2.x, q2.y, q3.x, q3.y, q4.x, q4.y);

  vertex(l / 100, -h / 2.87);
  vertex(l / 20, -h / 2.87);
  vertex(q1.x, q1.y);
  endShape();
}
function draw_inner_curve_window() {
  beginShape();
  let p1 = { x: -l / 40, y: -h / 6.2 };
  // First Control Point
  let p2 = { x: -l / 48, y: -h / 5.8 };
  // Second Control Point
  let p3 = { x: -l / 48, y: -h / 5.8 };
  // Anchor Point
  let p4 = { x: 0, y: -h / 5.5 };

  let q1 = { x: 0, y: -h / 5.5 };
  // First Control Point
  let q2 = { x: l / 48, y: -h / 5.85 };
  // Second Control Point
  let q3 = { x: l / 48, y: -h / 5.85 };
  // Anchor Point
  let q4 = { x: l / 40, y: -h / 6.2 };

  beginShape();
  // Specify the first anchor point
  vertex(p1.x, p1.y);
  // Specify the other points for bezierVertex()
  bezierVertex(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  vertex(q1.x, q1.y);
  bezierVertex(q2.x, q2.y, q3.x, q3.y, q4.x, q4.y);
  vertex(p1.x, p1.y);
  endShape();
}
function draw_inner_window() {
  beginShape();
  vertex(-l / 100, -h / 15);
  vertex(-l / 40, -h / 6.6);
  vertex(l / 40, -h / 6.6);
  vertex(l / 100, -h / 15);
  vertex(-l / 100, -h / 15);
  endShape();
}
function glow(glowColor, blurriness) {
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = blurriness;
}

/*
  push()
  //Outer circular windows
  for(i = 0; i < window_num; i ++){
    fill(circle_window_color)
    strokeWeight(8)
    rotate(360/12)
    circle(0, l/3.5, l/20)
  }
  pop()
  */

/*
    light_mode = 'night'
    for(let x = 100; x < width-100; x+=1) {
      if (x == 0) {
        px = 0;
      }
         let x_range = random(-light_radius, light_radius)
    let y_range = 0
    if(random(0, 1) < 0.25){
      //print('here')
      y_range = sqrt(abs(sq(light_radius) - sq(x_range))) + map(noise(x*0.01,nx), 0, 1, 0, h_light)
    }
    else if(random(0, 1) >= 0.25 < 0.5){
      //print('here')
      y_range = sqrt(abs(sq(light_radius) - sq(x_range))) - map(noise(x*0.01,nx), 0, 1, 0, h_light)
    }
    else if(random(0, 1) >= 0.5 < 0.75){
      //print('here')
      y_range = -sqrt(abs(sq(light_radius) - sq(x_range))) - map(noise(x*0.01,nx), 0, 1, 0, h_light)
    }
    else{
      y_range = -sqrt(abs(sq(light_radius) - sq(x_range))) + map(noise(x*0.01,nx), 0, 1, 0, h_light)
    }
    
    push()
    stroke(150,0, 100, alpha/15);
    strokeWeight(10)
    line(0,0, x-l/2, y_range);
    pop()
    push()
    strokeWeight(10)
    stroke(light_night_color);
    line(0,0, x-l/2, y_range);
    //ine(0,0, x-width/2, y-depthGreen);
    pop()
    
  }
  nx += 0.00005*h_light;
  */

/*
  for(let x = light_width; x < width-light_width; x+=1) {
  if(x%2 == 0){
    if (x == 0) {
      px = 0;
    }
    //print(cy)
    let y = cy + map(noise(x*0.01,nx), 0, 1, 0, h_light);
    let depthGreen = map(noise (x*0.05,nx),0,1,20,h_light);
    let depthPink = map(noise (x*0.1,nx),0,1,-h_light/2,h_light*1.5);
        
    stroke(light_color1);
    strokeWeight(5)
    line(0,light_start_y, x-width/2, y-depthPink);
    
    stroke(10,20,100, alpha/12);
    line(0,light_start_y, x-width/2, y-depthGreen);


    px = x;
    py = y;
  }
    

  }
  nx += 0.00005*h_light;
  */
