// Interactive background numbers
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numbers = [];
const numCount = 100; // number of floating numbers

class NumberParticle {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.size = 10;
    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;
  }

  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.font = `${this.size}px monospace`;
    ctx.fillText(this.value, this.x, this.y);
  }

  update(mouse) {
    // Move
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    // Ripple effect
    const dist = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    if (dist < 80) {
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  numbers.forEach((n) => n.update(mouse));
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

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
});

init();
animate()


