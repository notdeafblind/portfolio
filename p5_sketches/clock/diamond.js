class Diamond {
  constructor(startPos, max_scale_diamond, 
               change_x, change_y,
               timerStart, dia_alpha, alpha_inter) {
    this.orig = {x:startPos.x, y: startPos.y};
    this.max_scale = max_scale_diamond;
    this.dia_alpha = dia_alpha;
    this.init_alpha = dia_alpha;
    this.alpha_inter = alpha_inter;
    this.timerStart = timerStart;
    this.growing = true;
    this.change_x = change_x
    this.change_y = change_y
    this.window_num = 12
    this.grow_fac = 0.8
    this.h = 1000
    this.l = 1000
  }
  update() {
    if (this.growing) {
      this.dia_alpha = this.dia_alpha + this.alpha_inter;
    }
  }

  draw_diamond(x_switch) {
    
    let new_orig = this.orig
    translate(new_orig.x, new_orig.y);
    let x1 = {
      x: new_orig.x -x_switch,
      y: new_orig.y - (-(this.h / 2.8) + this.change_y),
    };
    
    let x2 = {
      x: new_orig.x - this.l / 80 - x_switch,
      y: new_orig.y - (-(this.h / 2.5) + this.change_y),
    };
    let x3 = {
      x: new_orig.x - x_switch,
      y: new_orig.y - (-(this.h / 2.2) + this.change_y),
    };
    let x4 = {
      x: new_orig.x + this.l / 80 - x_switch,
      y: new_orig.y - (-(this.h / 2.5) + this.change_y),
    };
    if (Number.isNaN(x1.x)) {
      print("scale a bit too small");
    } else {
      
      scale(this.max_scale);
      push();
      quad(x1.x, x1.y, x2.x, x2.y, x3.x, x3.y, x4.x, x4.y);
      pop();
    }
  }

  show() {
    //print(this.max_scale)
    push();
    fill(170, 30, 100, this.dia_alpha);
    noStroke()
    this.draw_diamond(this.change_x)
    pop()
    push()
    noStroke()
    fill(170, 30, 100, this.dia_alpha);
    this.draw_diamond(-this.change_x)
    pop();
  }
  timeToBranch() {
    if (this.dia_alpha > 1 && this.growing) {
      this.growing = false;
      return true;
    } else {
      return false;
    }
  }
  diamond(x_change_fac) {
    let new_x_base = this.change_x * this.grow_fac;
    let new_x_change = new_x_base * x_change_fac;
    let new_y_change = this.change_y * this.grow_fac
    let new_max = this.max_scale * this.grow_fac;
    let new_orig = { x: this.orig.x, y: this.orig.y - this.grow_fac * this.change_y}
    return new Diamond(new_orig, new_max, 
               new_x_change, new_y_change,
               this.timerStart, 0, this.alpha_inter);
  }
}
