let particles = [];

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100); // Use HSB for fun color ranges
}

function draw() {
  background(0, 0, 90); // Light background

  face();
  hair();
  brow();
  eyes();
  mouth();
  // Spawn particles at mouse position when pressed
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  }

  // Update and display all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.lifespan <= 0) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = random(5, 20);
    this.h = random(5, 20);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.lifespan = 100;

    // Assign random HSB color
    this.color = color(random(360), 80, 100, 100);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= 2;
  }

  display() {
    push();
    this.color.setAlpha(this.lifespan); // Fade out
    stroke(this.color);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

function eyes(){
  // Eye socket positions
  let leftX = 200;
  let rightX = 330;
  let eyeY = 300;

  // Draw eye shapes
  fill(51);
  ellipse(leftX, eyeY, 80, 90);
  ellipse(rightX, eyeY, 80, 90);

  // Pupil tracking logic
  let dxL = mouseX - leftX;
  let dyL = mouseY - eyeY;
  let angleL = atan2(dyL, dxL);
  let radius = 15; // how far the pupil can move

  let dxR = mouseX - rightX;
  let dyR = mouseY - eyeY;
  let angleR = atan2(dyR, dxR);

  // Pupil centers
  let pupilLX = leftX + cos(angleL) * radius;
  let pupilLY = eyeY + sin(angleL) * radius;
  let pupilRX = rightX + cos(angleR) * radius;
  let pupilRY = eyeY + sin(angleR) * radius;

  // Pupils
  fill(255);
  ellipse(pupilLX, pupilLY, 45, 45);
  ellipse(pupilRX, pupilRY, 45, 45);

  // Eye arcs (for expression)
  strokeWeight(13);
  stroke(255);
  noFill();
  arc(leftX, 320, 55, 45, TWO_PI, PI, OPEN);
  arc(rightX, 320, 55, 45, TWO_PI, PI, OPEN);
  strokeWeight(1);
}

function brow(){
  stroke(0);
  strokeWeight(10);
  noFill();
  arc(200, 265, 75, 55, PI, TWO_PI, OPEN);
  arc(330, 265, 75, 55, PI, TWO_PI, OPEN);
  strokeWeight(1);
  arc(190, 180, 45, 55, PI, TWO_PI, OPEN);
  arc(340, 180, 45, 55, PI, TWO_PI, OPEN);
}

function mouth(){
  strokeWeight(1);
  stroke(0);
  arc(243, 400, 45, 50, TWO_PI, PI, OPEN);
  arc(287, 400, 45, 50, TWO_PI, PI, OPEN);
}
  
function face(){
  strokeWeight(2);
  stroke(0);
  fill(255);
  // ellipse(265,270, 400, 380);
  rectMode(CORNER);
  rect(85,130, 360,335, 55, 45, 20,55);
}
  
function hair(){
  noStroke()
  fill(0);
  arc(265, 220, 400, 350, PI, TWO_PI, OPEN);
}
