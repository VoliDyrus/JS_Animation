const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const color = require("canvas-sketch-util/color");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 60,
};

const params = {
  n: 80,
  cr: 150,
  speed: 2,
};

const sketch = ({ width, height }) => {
  const agents = [];

  const n = params.n;
  const cr = params.cr;

  for (let i = 0; i < n; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  const cx = width / 2;
  const cy = height / 2;

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    // add a ball
    context.save();
    context.translate(cx, cy);
    context.fillStyle = "black";

    context.beginPath();
    context.arc(0, 0, cr, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        distCenter = agent.pos.getDistance(new Vector(cx, cy));
        const distCenterThresh = cr;

        if (dist >= 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 7, 0);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = color.style([
          math.mapRange(dist, 25, 70, 150, 80),
          math.mapRange(dist, 0, 50, 90, 10),
          math.mapRange(dist, 0, 130, 255, 150),
          math.mapRange(dist, 10, 300, 0.8, 0.2),
        ]);
        context.stroke();

        if (distCenter > distCenterThresh) continue;
        agent.vel.x = agent.vel.x * -0.51;
        agent.vel.y = agent.vel.y * -0.51;
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt((dx * dx + dy * dy) * 0.4);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-0.5, 0.5), random.range(-0.5, 0.5));
    this.radius = random.range(4, 7);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();

    context.strokeStyle = "blue";
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 1;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);

    context.fill();
    context.stroke();

    context.restore();
  }
}
