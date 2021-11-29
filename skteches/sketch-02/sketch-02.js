const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ width, height }) => {
  const agents = [];
  for (let i = 0; i < 180; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  const agents2 = [];
  for (let i = 0; i < 100; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents2.push(new Agent2(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
    });

    agents2.forEach((agent2) => {
      agent2.update();
      agent2.drawSquare(context);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);

    context.fill();
    context.stroke();

    context.restore();
  }
}

class Agent2 {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1.5), random.range(-0.5, -1.5));
    this.radius = random.range(10, 30);
    this.width = random.range(10, 20);
    this.height = random.range(10, 20);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  drawSquare(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 2;
    context.beginPath();
    context.rect(0, 0, this.height, this.width);
    context.fill();
    context.stroke();
    context.restore();
  }
}
