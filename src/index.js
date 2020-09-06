import "./styles.css";
// props
const props = {
  spaceDiameter: 100,
  elementDiameter: 14,
  waveLength: 100,
  waveSpeed: 0.01,
  direction: 1,
};

//create canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "rgba(17,17,23,1)";
document.querySelector("body").appendChild(canvas);

//add width and height to canvas 100% of window
let canvasWidth = (canvas.width = window.innerWidth);
let canvasHeight = (canvas.height = window.innerHeight);

//add array of elements
let dotsList = [];

// adaptive resize window
window.onresize = function () {
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
  init();
};

//create element
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = props.elementDiameter / 2;
    this.scale = getDistance(x, y) / props.waveLength;
  }

  update() {
    this.resize();
    this.draw();
  }
  //change distance from center to element
  resize() {
    this.scale = this.scale - props.waveSpeed;
  }

  draw() {
    //change size of element
    let s = 1 - Math.abs(Math.sin(this.scale));
    let o = (1 - s) * 255;
    let radius = this.radius * s;
    ctx.beginPath();
    ctx.rect(this.x, this.y, radius, radius);
    ctx.closePath();
    ctx.fillStyle = `rgba(${o},255,${o},${s})`;
    ctx.fill();
  }
}

init();
// create array of elements
function init() {
  // how many elements fit in x-axis
  const dotsCountX = Math.floor(canvasWidth / props.spaceDiameter);
  // how many elements fit in y-axis
  const dotsCountY = Math.floor(canvasHeight / props.spaceDiameter);
  //margin left and right
  const startX =
    props.spaceDiameter / 2 +
    (canvasWidth - props.spaceDiameter * dotsCountX) / 2;
  //margin  top and bottom
  const startY =
    props.spaceDiameter / 2 +
    (canvasHeight - props.spaceDiameter * dotsCountY) / 2;
  //create elements
  for (let j = 0; j < dotsCountY; j++) {
    let y = startY + j * props.spaceDiameter;
    for (let i = 0; i < dotsCountX; i++) {
      let x = startX + i * props.spaceDiameter;
      dotsList.push(new Dot(x, y, "hold"));
    }
  }
}

loop();

//looking for changes in canvas and redraw
function loop() {
  //clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //update all elements
  for (let i = 0; i < dotsList.length; i++) {
    dotsList[i].update();
  }
  //call loop 60 times per second
  requestAnimationFrame(loop);
}

// get distance from element to center
function getDistance(x, y) {
  // cathetus
  let dx = canvasWidth / 2 - x;
  // cathetus
  let dy = canvasHeight / 2 - y;
  //hypotenuse - distance from element to center
  return Math.sqrt(dx * dx + dy * dy);
}
