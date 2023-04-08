// Set up canvas
const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Define constants
const NUM_SLOTS = 10;
const SLOT_WIDTH = canvas.width / NUM_SLOTS;
const BALL_RADIUS = SLOT_WIDTH / 2;
const BALL_SPEED = 10;

// Define state variables
let ballX = canvas.width / 2;
let ballY = BALL_RADIUS;
let ballVelocityX = BALL_SPEED;
let ballVelocityY = BALL_SPEED;
let slots = new Array(NUM_SLOTS).fill(0);

// Function to draw slots
function drawSlots() {
  for (let i = 0; i < NUM_SLOTS; i++) {
    ctx.beginPath();
    ctx.rect(i * SLOT_WIDTH, canvas.height - SLOT_WIDTH, SLOT_WIDTH, SLOT_WIDTH);
    ctx.fillStyle = "blue";
    ctx.fill();
  }
}

// Function to draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

// Function to update ball position
function updateBall() {
  // Update x position
  ballX += ballVelocityX;
  if (ballX < BALL_RADIUS || ballX > canvas.width - BALL_RADIUS) {
    ballVelocityX *= -1;
  }
  
  // Update y position
  ballY += ballVelocityY;
  if (ballY > canvas.height - BALL_RADIUS) {
    // Add ball to slot
    const slotIndex = Math.floor(ballX / SLOT_WIDTH);
    slots[slotIndex]++;
    
    // Reset ball position and velocity
    ballX = canvas.width / 2;
    ballY = BALL_RADIUS;
    ballVelocityX = BALL_SPEED;
    ballVelocityY = BALL_SPEED;
  }
}

// Function to draw slots and ball
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSlots();
  drawBall();
}

// Function to update game state and redraw
function tick() {
  updateBall();
  draw();
}

// Start game loop
setInterval(tick, 1000 / 60);

// Log slot data when game is over
setTimeout(() => {
  console.log(slots);
}, 5000);
