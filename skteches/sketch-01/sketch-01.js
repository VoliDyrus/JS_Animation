const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const num = 200;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.fillStyle = "#6495ED";
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 0.7), random.range(0.2, 0.7));
      context.beginPath();
      context.rect(
        -w * 0.5,
        random.range(0, -h * 3),
        w * random.range(0.2, 1),
        h * random.range(0.1, 30)
      );
      context.fill();
      context.restore();

      context.save();

      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(2, 20);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.3, 1.7),
        slice * random.range(1, -9),
        slice * random.range(-1, 3)
      );
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
