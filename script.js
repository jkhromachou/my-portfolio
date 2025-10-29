// Interactive background numbers
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let numbers = [];
const numCount = 100;

class NumberParticle {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.size = 10;
    this.dx = (Math.random() - 0.5) * 0.7;
    this.dy = (Math.random() - 0.5) * 0.7;
  }

  draw() {
    const isLight = document.body.classList.contains("light");
    ctx.fillStyle = isLight ? "rgba(50, 50, 50, 0.3)" : "rgba(255, 255, 255, 0.4)";
    ctx.font = `${this.size}px monospace`;
    ctx.fillText(this.value, this.x, this.y);
  }

  update(mouse) {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    const dist = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    if (dist < 100) {
      this.x += (this.x - mouse.x) / 10;
      this.y += (this.y - mouse.y) / 10;
    }

    this.draw();
  }
}

function init() {
  numbers = [];
  for (let i = 0; i < numCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const value = Math.floor(Math.random() * 10);
    numbers.push(new NumberParticle(x, y, value));
  }
}

const mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  numbers.forEach((n) => n.update(mouse));
  requestAnimationFrame(animate);
}

// Theme toggle
const themeButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  document.body.classList.add("light");
  themeButton.textContent = "🌞";
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeButton.textContent = isLight ? "🌞" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // refresh colors
});

init();
animate();
