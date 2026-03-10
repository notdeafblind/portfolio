/*
 * Title: Homework 7 Super Simple Clock
 * Author: Rebecca Sheng
 * Date:  SP 2026
 * Simple Description: This code displays a clock. The hour, minute and second can be read from the red segments of the shape. There are two modes for system time and custom time. Light rays from the shape will change based on the hour. The clock shape will change based on window size.
 * Instructions: Run the code to select one of two modes, system time or custom time. In system time, the time is displayed based on current system time. On custom mode, user can enter the hour they would like to see. The minute and seconds will be displayed as system time. In both modes, press the center button to return to title page and select mode again.
 */

let glass_img;
let red_glass;
let yellow_glass;
let purple_glass;
let deep_blue_glass;
let blue_purple_glass;

let flower0;
let flower1;
let flower2;
let flower3;
let flower4;
let flower5;
let flower6;
let flower7;
let flower8;
let flower9;
let flower10;
let flower11;

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

//For outer crystal growth
let dia_scale;
let dia_change_x;
let dia_change_y;
let current_time;
let max_scale = 0.8;
let grow_fac = 0.8;
let main_orig;

let diamonds = [];
let main_d;
let timerStart = 80;
let init_alpha = 0;
let alpha_inter;

//let shape;
let floewr_fade = 0;
let flower_time;
let flower_flag = 0;

let again_flag = false;

const TIME_BETWEEN_RANDOMIZATIONS = 100;

function preload() {
  font = loadFont("Lavish.ttf");
  font2 = loadFont("EagleLake.ttf");
  font3 = loadFont("fireSans.ttf");
  glass_img = loadImage("stained_glass_blue.jpg");
  red_glass = loadImage("stained_glass_red2.jpg");
  yellow_glass = loadImage("stained_glass_yellow_small.jpg");
  purple_glass = loadImage("stained_glass_purple.jpg");
  deep_blue_glass = loadImage("stained_glass_deep_blue.jpg");
  blue_purple_glass = loadImage("stained_glass_blue_purple.jpg");
  //shape = loadModel("lunar_tear.obj", true);
  flower0 = loadImage("/flowers/flower0.png");
  flower1 = loadImage("/flowers/flower1.png");
  flower2 = loadImage("/flowers/flower2.png");
  flower3 = loadImage("/flowers/flower3.png");
  flower4 = loadImage("/flowers/flower4.png");
  flower5 = loadImage("/flowers/flower5.png");
  flower6 = loadImage("/flowers/flower6.png");
  flower7 = loadImage("/flowers/flower7.png");
  flower8 = loadImage("/flowers/flower8.png");
  flower9 = loadImage("/flowers/flower9.png");
  flower10 = loadImage("/flowers/flower10.png");
  flower11 = loadImage("/flowers/flower11.png");
}

function setup() {
  //yellow_glass.resize(128, 256);
  //deep_blue_glass.resize(128, 181)
  sentenceArray = sentence.split("");
  r = windowWidth / 25;
  if (gpu_mode) {
    //createCanvas(windowWidth, windowHeight, WEBGL);
    createCanvas(1000, 1000, WEBGL);
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  //print(windowHeight)
  l = 1000;
  h = 1000;
  cy = height / 2;
  px = 0;
  py = cy;
  for (i = 0; i < outer_line_num; i++) {
    outer_line_length[i] = random(20, 80);
  }
  frameRate(25);
  dia_scale = 1;
  dia_change_y = h / 30;
  dia_change_x = -l / 20;
  main_orig = { x: 0, y: -h / 2.5 };
  grow_start = millis();
  //frameRate(30);
  current_time = millis();
  alpha_inter = map(5, 0, 255, 0, 1);

  let d = new Diamond(
    main_orig,
    max_scale,
    dia_change_x,
    dia_change_y,
    timerStart,
    init_alpha,
    alpha_inter
  );
  main_d = new Diamond(main_orig, 1, 0, 0, 80, 1, 1);
  diamonds.push(d);
  current_time = millis();
  flower_time = millis();
}

function draw() {
  background(0);
  colorMode(HSB);
  angleMode(DEGREES);
  //ambientLight(100);
  //pointLight(10, 10, 10, 0, 0, 100);
  if (time_mode == 0) {
    // Title mode
    again_flag = false;
    textFont(font);
    textSize(l / 10);
    textAlign(CENTER);
    fill(255, 0, 100, fade);
    text("The Clock", -l/10, -50);
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
    again_flag = false;
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
    // Add custom button
    let d = l / 25;
    if (!again_flag) {
      if (dist(mouseX, mouseY, l / 2, h / 2) <= d) {
        cursor("grab");
      } else {
        cursor(ARROW);
      }
    } else if (dist(mouseX, mouseY, l / 2, h / 2) <= d) {
      cursor(ARROW);
      choose_again();
    }
    draw_clock(hour_value);
    draw_circle();
  } else {
    let d = l / 25;
    if (!again_flag) {
      if (dist(mouseX, mouseY, l / 2, h / 2) <= d) {
        cursor("grab");
      } else {
        cursor(ARROW);
      }
    } else if (dist(mouseX, mouseY, l / 2, h / 2) <= d) {
      cursor(ARROW);
      choose_again();
    }
    draw_clock(hour());
    draw_circle();
    fill(100, 0, 100);
    textAlign(CENTER);
    textSize(23);
    textFont(font3);
    let text_x = r * cos(theta);
    let text_y = r * sin(theta);
  }
}
function mouseClicked() {
  again_flag = !again_flag;
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
  again_flag = false;
}

function draw_circle() {
  let circle_window_color = color(180, 16, 100);
  push();
  noStroke();
  //center circle
  fill(circle_window_color);
  texture(glass_img);
  circle(0, 0, l / 25);
  pop();
}

function draw_clock(hour_value) {
  draw_windows();

  //Draw hour, minute and second
  draw_time(hour_value);

  //Draw ray of light
  draw_light(hour_value);

  for (let i = diamonds.length - 1; i >= 0; i--) {
    // Get the branch, update and draw it
    let d = diamonds[i];
    d.update();
    push();
    frameRate(10);

    for (j = 0; j < window_num; j++) {
      rotate(360 / window_num);
      d.show();
    }

    pop();

    // If it's ready to split
    if (d.timeToBranch()) {
      if (d.max_scale > 0.2) {
        diamonds.push(d.diamond(1)); // Add one going right
        diamonds.push(d.diamond(2)); // Add one going left
      }
    }
  }
  if ((millis() - current_time) / 1000 > 30) {
    diamonds = [];
    alpha_inter = map(5, 0, 255, 0, 1);
    let d = new Diamond(
      main_orig,
      max_scale,
      dia_change_x,
      dia_change_y,
      80,
      init_alpha,
      alpha_inter
    );
    diamonds.push(d);
    current_time = millis();

    flower_flag = 1;
    flower_time = millis();
  }
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
  pop();

  push();
  //inner rectangular window
  noStroke();
  //fill(inner_window_color);
  texture(yellow_glass);
  textureMode(NORMAL);
  for (i = 0; i < window_num; i++) {
    draw_inner_window();
    rotate(360 / 12);
  }
  pop();

  push();
  noStroke();
  fill(inner_curve_window_color);
  for (i = 0; i < window_num; i++) {
    rotate(360 / 12);
    draw_inner_curve_window();
  }

  pop();

  push();
  //outer rectangular windows
  noStroke();
  fill(outer_window_color);
  textureMode(NORMAL);
  texture(purple_glass);
  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    draw_outer_window();
  }

  pop();

  push();
  fill(insert_window_color);
  noStroke();

  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    draw_insert_window();
    draw_insert_window();
  }
  pop();

  push();
  fill(outer_deco_color);
  noStroke();
  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);
    push();
    draw_diamond();
    pop();
    draw_outer_deco(40);
    draw_outer_deco(-40);
  }
  pop();
  draw_circular_windows();
}

function draw_circular_windows() {
  let circle_window_color = color(180, 16, 100);
  push();
  //center circle
  texture(glass_img);
  circle(0, 0, l / 25);
  pop();

  push();
  stroke(100, 100, 0);
  strokeWeight(8);
  fill(circle_window_color);
  texture(glass_img);
  for (i = 0; i < window_num; i++) {
    rotate(360 / window_num);

    circle(0, -h / 3, l / 15);
  }

  pop();
  push();

  fill(circle_window_color);
  texture(glass_img);
  //Inner circular windows
  for (i = 0; i < window_num; i++) {
    strokeWeight(8);
    rotate(360 / 12);
    circle(0, l / 10, l / 25);
  }
  pop();
}

function select_texture(angle) {
  if (angle % 360 == 0) {
    return flower0;
  } else if (angle % 360 == 30) {
    return flower1;
  } else if (angle % 360 == 60) {
    return flower2;
  } else if (angle % 360 == 90) {
    return flower3;
  } else if (angle % 360 == 120) {
    return flower4;
  } else if (angle % 360 == 150) {
    return flower5;
  } else if (angle % 360 == 180) {
    return flower6;
  } else if (angle % 360 == 210) {
    return flower7;
  } else if (angle % 360 == 240) {
    return flower8;
  } else if (angle % 360 == 270) {
    return flower9;
  } else if (angle % 360 == 300) {
    return flower10;
  } else if (angle % 360 == 330) {
    return flower11;
  } else {
    return red_glass;
  }
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
  texture(select_texture(minute_angle));
  rotate(minute_angle);
  circle(0, -l / 10, l / 25);
  pop();

  push();
  //Draw hour representation
  fill(hour_color);

  //noStroke();
  stroke(10);
  hour_angle = map(hour_value, 0, 12, 0, 360);
  texture(select_texture(hour_angle));
  rotate(hour_angle);
  circle(0, -h / 3, l / 15);
  pop();
}

function draw_light(hour_value) {
  let alpha = map(50, 0, width, 0.5, 0.8);
  let light_color1 = color(150, 0, 100, alpha / 15);
  let light_day_color = color(60, 20, 60, alpha / 12);
  let light_night_color = color(150, 0, 80, alpha / 1.8);
  let light_dawn_color = color(10, 20, 100, alpha / 12);
  push();
  h_light = 400;
  light_start_y = map(hour_value, 6, 18, -l / 4, l / 4);
  light_width = map(hour_value, 0, 12, 500, 200);
  if (hour_value >= 19 || hour_value <= 5) {
    //night mode

    push();
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
    //ambientLight(80);
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
    //ambientLight(120);
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
  textureMode(NORMAL);
  texture(deep_blue_glass);
  push();
  rotate(15);
  beginShape();
  vertex(0, -h / 10, 0.5, 0.4);
  vertex(-l / 80, -h / 2.7, 0.5 + 1 / 100, 1 / 2.7);
  vertex(0, -h / 2, 0.5, 0);
  vertex(l / 80, -h / 2.7, 0.5 - 1 / 100, 1 / 2.7);
  vertex(0, -h / 10, 0.5, 0.4);
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
  vertex(p1.x, p1.y, 0.2, 0.2);
  // Specify the other points for bezierVertex()
  bezierVertex(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  vertex(-l / 100, -h / 2.87, 0.2, 0.4);
  vertex(-l / 20, -h / 2.87, 0.4, 0.8);
  vertex(p1.x, p1.y, 1, 1);
  endShape();

  beginShape();
  // Specify the first anchor point
  vertex(q1.x, q1.y, 0.2, 0.2);
  // Specify the other points for bezierVertex()
  bezierVertex(q2.x, q2.y, q3.x, q3.y, q4.x, q4.y);

  vertex(l / 100, -h / 2.87, 0.2, 0.6);
  vertex(l / 20, -h / 2.87, 0.8, 0.8);
  vertex(q1.x, q1.y, 1, 1);
  endShape();
}
function draw_inner_curve_window() {
  //textureMode(NORMAL);
  //texture(blue_purple_glass)

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
  textureMode(NORMAL);
  texture(yellow_glass);
  beginShape();
  vertex(-l / 100, -h / 150, 0, 0);
  vertex(-l / 40, -h / 6.6, 0, 1);
  vertex(l / 40, -h / 6.6, 0.5, 0);
  vertex(l / 100, -h / 15, 0.5, 1);
  vertex(-l / 100, -h / 15, 1, 1);
  endShape();
}
