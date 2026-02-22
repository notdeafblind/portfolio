/*
* Title: Homework 3 Digital Coin Flip
* Author: Rebecca Sheng
* Date:  Jan 2026
* Simple Description: A coin flip game with animation. Click the button to start flipping the coin. The head or tail result will be displayed and the user can choose to play again by clicking button. 
* Instructions: Click the button to start the game. On the result page, click the "Play again" button to replay the game.
*/

let rotation_angle = 0  // Coin rotation animation angle
let flip_coin = false   // Whether the user clicked to start the game
let font;               // Load font for the result text
let random_result;      // Randomly generated number to decide the result
let result;             // If the random number is smaller than 0.5, the result is tail. Otherwise, the result is head.
let startButton;        // The button for restarting the game

async function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES)
  colorMode(HSB)
  
  // Create coin head sun texture
  head_text = createGraphics(150, 150)
  head_text.colorMode(HSB)
  head_text.angleMode(DEGREES)
  head_text.translate(75, 75)
  head_text.strokeWeight(1)
  head_text.background(56, 100, 100)
  drawSun(head_text)
  
  // Create coin tail moon texture
  tail_text = createGraphics(150, 150)
  tail_text.colorMode(HSB)
  tail_text.angleMode(DEGREES)
  tail_text.translate(75, 75)
  tail_text.background(56, 100, 100)
  tail_text.strokeWeight(1)
  tail_text.fill(56, 100, 0)
  drawLight(tail_text)
  drawMoon(tail_text)

  // Create the button for user to click to start the game
  button_text = createGraphics(200, 50)
  button_text.colorMode(HSB)
  button_text.angleMode(DEGREES)
  button_text.background(64, 3, 66)
  button_text.textAlign(CENTER)
  button_text.textSize(18)
  button_text.text('Click to flip the coin', 100,30)
  
  // Load result text font and style
  font = await loadFont('https://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjihdqrhxXD-wGvjU.ttf');
  textFont(font)
  textSize(50)
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  fill(0)
}


function draw() {
  background(220);
  strokeWeight(1.5)
  fill(0)
  push()
  fill(100, 100, 0);
  textSize(40);
  textAlign(CENTER, TOP);
  text("Coin Flipper", 0, -200);
  pop()
  if(!flip_coin){
    // When there is no user input, simply rotate the coin
    drawButton();
    coinRotation();
    
    // Change cursor to hand when placed on the play button
    if(mouseX>= 100 && mouseX <= 300 && mouseY >= 320 && mouseY <=370){
      cursor('grab')
    }
    else{
      cursor(ARROW)
    }
  }
  
  else if(mouseX>= 100 & mouseX <= 300 & mouseY >= 320 & mouseY <=370){
    cursor(ARROW)
    // If the coin flip button is clicked, generate and display result
    random_result = random(0,1)
    if(random_result < 0.5){
      result = 0;
    }
    else{
      result = 1;
    }
    if(result){
      texture(head_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      text('Head!', 0, 150)
    }
    else{
      texture(tail_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      text('Tail!', 0, 150)
    }
    // Allow the result to stay until the replay button is clicked
    noLoop();
    startButton = createButton('Play again');
    startButton.position(250, 30);
    startButton.size(100, 50);
    startButton.mousePressed(removeBtn);
  }
  else{
    // Click regions outside the flip button does not start the game
    flip_coin = false;
  }
}


function removeBtn() {
  // Remove button after the button is clicked and the game is restarted
  loop()
  startButton.remove();
}

function mouseClicked(){
  flip_coin = !flip_coin
}

function rotateCircle(rotation_degree) {
  // Coin rotation animation
  rotateZ(0);
  rotateX(0);
  rotateY(rotation_degree);
}

function drawMoon(graphic_obj){
  // Draw the moon texture on the tail of coin
  
  //Draw the moon
  graphic_obj.push()
  graphic_obj.fill(64, 15, 80)
  graphic_obj.circle(0, 0, 80)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.arc(-40, 0, 80, 80, -60, 60 )
  graphic_obj.arc(0, 0, 80, 80, 120, 240)
  graphic_obj.pop()
  
  // Draw the stars and constellation
  graphic_obj.push()
  graphic_obj.noStroke()
  graphic_obj.fill(100, 0, 100)
  graphic_obj.circle(20, 0, 10)
  graphic_obj.circle(15, 10, 5)
  graphic_obj.circle(20, -20, 5)
  graphic_obj.circle(10, -10, 6)
  graphic_obj.circle(25, 15, 12)
  graphic_obj.circle(10, -20, 15)
  graphic_obj.circle(10, 30, 4)
  graphic_obj.circle(5, 30, 8)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.angleMode(DEGREES)
  graphic_obj.stroke(100, 0, 100)
  graphic_obj.strokeWeight(2)
  graphic_obj.line(20, 0, 20, 8)
  graphic_obj.line(20, 0, 20, -10)
  graphic_obj.line(20, 0, 10, -10)
  graphic_obj.line(25, 15, 10, 30)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.strokeWeight(4)
  graphic_obj.stroke(100, 0, 100)
  graphic_obj.point(-15, -15)
  graphic_obj.point(-27, -8)
  graphic_obj.point(-25, 4)
  graphic_obj.point(-15, 8)
  graphic_obj.point(-17, 15)
  graphic_obj.point(-25, 20)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.strokeWeight(1)
  graphic_obj.stroke(100, 0, 100)
  graphic_obj.point(20, 25)
  graphic_obj.point(-10, 20)
  graphic_obj.point(-30, 15)
  graphic_obj.point(-30, -15)
  graphic_obj.point(-5, -5)
  graphic_obj.point(-18, -10)
  graphic_obj.point(-23, -24)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.strokeWeight(2)
  graphic_obj.stroke(100, 0, 100)
  graphic_obj.point(-35, 10)
  graphic_obj.point(-10, -20)
  graphic_obj.point(10, 25)
  graphic_obj.point(-30, -5)
  graphic_obj.point(-15, -3)
  graphic_obj.point(-25, -20)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.stroke(100, 0, 100)
  graphic_obj.strokeWeight(1)
  graphic_obj.line(-15, -15, -27, -8)
  graphic_obj.line(-27, -8, -25, 4)
  graphic_obj.line(-25, 4, -15, 8)
  graphic_obj.line( -15, 8, -17, 15)
  graphic_obj.line(-17, 15, -25, 20)
  graphic_obj.pop()
}

function drawSun(graphic_obj){
  // Draw the sun texture on the head of the coin
  
  drawLight(graphic_obj)
  
  graphic_obj.push()
  graphic_obj.noFill()
  drawRay(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(60);
  drawRay(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(120);
  drawRay(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(180);
  drawRay(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(240);
  drawRay(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(300);
  drawRay(graphic_obj)
  graphic_obj.pop()

  graphic_obj.push()
  graphic_obj.rotate(30)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(90)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(150)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(210)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(270)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.rotate(330)
  drawRay_triangle(graphic_obj)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.strokeWeight(0.5)
  graphic_obj.fill(11, 75, 100)
  graphic_obj.circle(0, 0, 25)
  graphic_obj.pop()
}

function drawButton(){
  //Draw the button to start the flip game
  push()
  stroke(64, 3, 80)
  strokeWeight(2)
  texture(button_text)
  rect(-100, 120, 200, 50, 15, 15, 15, 15)
  pop()
  
  // Add button shadow to texture
  push()
  stroke(64, 3, 90)
  strokeWeight(2)
  line(-90, 160, 90, 160)
  line(-95, 130, -95, 140)
  line(-95, 150, -95, 155)
  line(-80, 123, -40, 123)
  line(-20, 123, -10, 123)
  pop()
  
  push()
  strokeWeight(2)
  stroke(64, 3, 40)
  line(-91, 162, -91, 168)
  line(-92, 162, -92, 167)
  line(91, 162, 91, 168)
  line(92, 162, 92, 167)
  pop()
  
  push()
  noStroke()
  fill(64, 3, 40)
  rect(-90, 162, 180, 8)
  pop()
}

function coinRotation(){
  // Create the coin rotation animation before the coin is flipped
  
    if(rotation_angle < 90){
      rotateCircle(rotation_angle);
      texture(head_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      rotation_angle ++;
      //print(rotation_angle)
      }
  else if(rotation_angle >= 90 & rotation_angle < 270){
      //pop();
      //push();
      //print(rotation_angle)
      rotateCircle(rotation_angle);
      texture(tail_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      //pop();
      rotation_angle++
    }
  else if(rotation_angle >=270 & rotation_angle < 360){
      rotateCircle(rotation_angle);
      texture(head_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      rotation_angle ++;
  }
  else{
    rotation_angle = 0
    //print(rotation_angle)
  }
}

function drawRay(graphic_obj){
  //Draw the curved rays on the sun texture
  graphic_obj.fill(11, 75, 100)
  graphic_obj.beginShape()
  graphic_obj.curveVertex(-3,-5);
  graphic_obj.curveVertex(-3,-5);
  graphic_obj.curveVertex(-1,-15);
  graphic_obj.curveVertex(-5,-20);
  graphic_obj.curveVertex(0, -40);
  graphic_obj.curveVertex(0, -40);
  graphic_obj.curveVertex(-2, -22)
  graphic_obj.curveVertex(3, -15)
  graphic_obj.curveVertex(3, -5)
  graphic_obj.curveVertex(3, -5)
  graphic_obj.endShape()
  
}

function drawRay_triangle(graphic_obj){
  //Draw the triangular rays on the sun texture
  graphic_obj.fill(11, 75, 100)
  graphic_obj.beginShape()
  graphic_obj.vertex(-4, -5)
  graphic_obj.vertex(0, -40)
  graphic_obj.vertex(4, -5)
  graphic_obj.endShape()
}

function drawLight(graphic_obj){
  // Draw coin reflection and shadow
  graphic_obj.push()
  graphic_obj.stroke(40, 50, 100)
  graphic_obj.noFill()
  graphic_obj.strokeWeight(4)
  graphic_obj.arc(0, 0, 120, 120, 210, 60)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.stroke(58, 30, 100)
  graphic_obj.noFill()
  graphic_obj.strokeWeight(4)
  graphic_obj.arc(0, 0, 120, 120, 60, 210)
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.fill(58, 60, 100)
  graphic_obj.noStroke()
  graphic_obj.beginShape()
  graphic_obj.vertex(40, -40)
  graphic_obj.vertex(-50, 40)
  graphic_obj.vertex(-40, 50)
  graphic_obj.vertex(50, -30)
  graphic_obj.endShape()
  graphic_obj.pop()
  
  graphic_obj.push()
  graphic_obj.fill(58, 60, 100)
  graphic_obj.noStroke()
  graphic_obj.beginShape()
  graphic_obj.vertex(8, -57)
  graphic_obj.vertex(-58, 0)
  graphic_obj.vertex(-50, 30)
  graphic_obj.vertex(30, -50)
  graphic_obj.endShape()
  graphic_obj.pop()
}



// Backup code
/*head_text.push()
  head_text.fill(11, 75, 100)
  head_text.beginShape()
  head_text.curveVertex(45,45);
  head_text.curveVertex(45,45);
  head_text.curveVertex(50,35);
  head_text.curveVertex(40,30);
  head_text.curveVertex(50, 10);
  head_text.curveVertex(50, 10);
  //curveVertex(60,45);
  //curveVertex(55,40);
  //curveVertex(60,35);
  head_text.curveVertex(45, 28)
  head_text.curveVertex(60, 35)
  head_text.curveVertex(55, 45)
  head_text.curveVertex(55, 45)
  head_text.endShape()
  head_text.pop()*/



/*head_text.push()
  head_text.stroke(40, 50, 100)
  head_text.noFill()
  head_text.strokeWeight(4)
  head_text.arc(0, 0, 120, 120, 210, 60)
  head_text.pop()
  
  head_text.push()
  head_text.stroke(58, 30, 100)
  head_text.noFill()
  head_text.strokeWeight(4)
  head_text.arc(0, 0, 120, 120, 60, 210)
  head_text.pop()
  
  head_text.push()
  head_text.fill(58, 60, 100)
  head_text.noStroke()
  head_text.beginShape()
  head_text.vertex(40, -40)
  head_text.vertex(-50, 40)
  head_text.vertex(-40, 50)
  head_text.vertex(50, -30)
  head_text.endShape()
  head_text.pop()
  
  head_text.push()
  head_text.fill(58, 60, 100)
  head_text.noStroke()
  head_text.beginShape()
  head_text.vertex(8, -57)
  head_text.vertex(-58, 0)
  head_text.vertex(-50, 30)
  head_text.vertex(30, -50)
  head_text.endShape()
  head_text.pop()
  */


  /*
  if(rotation_angle < 90){
      rotateWithFrameCount(rotation_angle);
      texture(head_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      rotation_angle ++;
      //print(rotation_angle)
      }
  else if(rotation_angle >= 90 & rotation_angle < 270){
      //pop();
      //push();
      //print(rotation_angle)
      rotateWithFrameCount(rotation_angle);
      texture(tail_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      //pop();
      rotation_angle++
    }
  else if(rotation_angle >=270 & rotation_angle < 360){
      rotateWithFrameCount(rotation_angle);
      texture(head_text)
      stroke(100, 100, 0)
      circle(0, 0, 200);
      rotation_angle ++;
  }
  else{
    rotation_angle = 0
    //print(rotation_angle)
  }
  */


/*
  drawLight(head_text)
  
  head_text.push()
  head_text.noFill()
  drawRay(head_text)
  head_text.pop()
  
  head_text.push()
  head_text.rotate(60);
  drawRay(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(120);
  drawRay(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(180);
  drawRay(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(240);
  drawRay(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(300);
  drawRay(head_text)
  head_text.pop()

  head_text.push()
  head_text.rotate(30)
  drawRay_triangle(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(90)
  drawRay_triangle(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(150)
  drawRay_triangle(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(210)
  drawRay_triangle(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(270)
  drawRay_triangle(head_text)
  head_text.pop()
  head_text.push()
  head_text.rotate(330)
  drawRay_triangle(head_text)
  head_text.pop()
  
  head_text.push()
  head_text.strokeWeight(0.5)
  head_text.fill(11, 75, 100)
  head_text.circle(0, 0, 25)
  head_text.pop()
  */


  /*
  tail_text.push()
  tail_text.fill(64, 15, 80)
  tail_text.circle(0, 0, 80)
  tail_text.pop()
  
  tail_text.push()
  tail_text.arc(-40, 0, 80, 80, -60, 60 )
  tail_text.arc(0, 0, 80, 80, 120, 240)
  tail_text.pop()
  
  
  
  tail_text.push()
  tail_text.noStroke()
  tail_text.fill(100, 0, 100)
  tail_text.circle(20, 0, 10)
  tail_text.circle(15, 10, 5)
  tail_text.circle(20, -20, 5)
  tail_text.circle(10, -10, 6)
  tail_text.circle(25, 15, 12)
  tail_text.circle(10, -20, 15)
  tail_text.circle(10, 30, 4)
  tail_text.circle(5, 30, 8)
  tail_text.pop()
  
  tail_text.push()
  tail_text.angleMode(DEGREES)
  tail_text.stroke(100, 0, 100)
  tail_text.strokeWeight(2)
  tail_text.line(20, 0, 20, 8)
  tail_text.line(20, 0, 20, -10)
  tail_text.line(20, 0, 10, -10)
  tail_text.line(25, 15, 10, 30)

  tail_text.pop()
  
  tail_text.push()
  tail_text.strokeWeight(4)
  tail_text.stroke(100, 0, 100)
  tail_text.point(-15, -15)
  tail_text.point(-27, -8)
  tail_text.point(-25, 4)
  tail_text.point(-15, 8)
  tail_text.point(-17, 15)
  tail_text.point(-25, 20)
  tail_text.pop()
  
  tail_text.push()
  tail_text.strokeWeight(1)
  tail_text.stroke(100, 0, 100)
  tail_text.point(-20, 25)
  tail_text.point(-10, 20)
  tail_text.point(-30, 15)
  tail_text.point(-30, -15)
  tail_text.point(-5, -5)
  tail_text.point(-18, -10)
  tail_text.point(-23, -24)
  tail_text.pop()
  
  tail_text.push()
  tail_text.strokeWeight(2)
  tail_text.stroke(100, 0, 100)
  tail_text.point(-35, 10)
  tail_text.point(-10, -20)
  tail_text.point(10, 25)
  tail_text.point(-30, -5)
  tail_text.point(-15, -3)
  tail_text.point(-25, -20)
  tail_text.pop()
  
  tail_text.push()
  tail_text.stroke(100, 0, 100)
  tail_text.strokeWeight(1)
  tail_text.line(-15, -15, -27, -8)
  tail_text.line(-27, -8, -25, 4)
  tail_text.line(-25, 4, -15, 8)
  tail_text.line( -15, 8, -17, 15)
  tail_text.line(-17, 15, -25, 20)
  tail_text.pop()*/