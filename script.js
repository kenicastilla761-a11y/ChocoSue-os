const pages = Array.from(document.querySelectorAll(".page"));
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const soundBtn = document.getElementById("soundBtn");

let currentPage = 0;
let soundOn = true;

// Crea los puntos de navegación.
pages.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.addEventListener("click", () => goToPage(i));
  dotsContainer.appendChild(dot);
});

function updateBook() {
  pages.forEach((page, index) => {
    page.classList.toggle("flipped", index < currentPage);
  });

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
}

function playFlip() {
  if (!soundOn) return;

  // Sonido corto generado con Web Audio; no necesita archivos externos.
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.045, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    playFlip();
    updateBook();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    playFlip();
    updateBook();
  }
}

function goToPage(page) {
  if (page === currentPage) return;
  currentPage = Math.max(0, Math.min(page, pages.length - 1));
  playFlip();
  updateBook();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") prevPage();
});

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? "🔊" : "🔇";
  soundBtn.setAttribute("aria-label", soundOn ? "Desactivar sonido" : "Activar sonido");
});

// También permite pasar página haciendo clic en el lado derecho/izquierdo.
document.getElementById("book").addEventListener("click", (event) => {
  if (event.target.closest("button")) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;

  if (x > rect.width / 2) nextPage();
  else prevPage();
});

updateBook();
