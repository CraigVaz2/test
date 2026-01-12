/* =====================
   PASSWORD (index.html)
===================== */
function checkCode() {
  const input = document.getElementById("codeInput");
  const error = document.getElementById("error");

  if (!input || !error) return;

  const correctCode = "1234"; // change later

  if (input.value.trim() === correctCode) {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}

/* =====================
   UNLOCKED PAGE LOGIC
===================== */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let pleaLevel = 0;

const pleas = [
  "Yes ❤️",
  "Please ❤️",
  "Pretty please ❤️",
  "Pretty please with sprinkles ❤️",
  "Please… it’s you ❤️"
];

if (noBtn && yesBtn) {
  noBtn.addEventListener("mouseover", resist);
  noBtn.addEventListener("click", resist);
}

function resist(e) {
  e.preventDefault();

  pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);

  // Shrink + move NO
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform =
    `translate(${x}px, ${y}px) scale(${1 - pleaLevel * 0.15})`;
  noBtn.style.opacity =
    Math.max(0.3, 1 - pleaLevel * 0.2);

  // Grow YES
  yesBtn.textContent = pleas[pleaLevel];
  yesBtn.style.transform = `scale(${1 + pleaLevel * 0.35})`;

  // Final takeover
  if (pleaLevel === pleas.length - 1) {
    yesBtn.style.position = "fixed";
    yesBtn.style.top = "0";
    yesBtn.style.left = "0";
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100vh";
    yesBtn.style.fontSize = "2.5em";
    yesBtn.style.borderRadius = "0";
    yesBtn.style.zIndex = "999";
  }
}

/* =====================
   YES CLICK
===================== */
function accept() {
  const song = document.getElementById("loveSong");
  if (song) {
    song.volume = 0.6;
    song.currentTime = 0;
    song.play().catch(() => {});
  }

  startHearts();

  const question = document.getElementById("questionText");
  const buttons = document.getElementById("choiceButtons");
  const afterYes = document.getElementById("afterYes");

  if (question) question.style.display = "none";
  if (buttons) buttons.style.display = "none";

  setTimeout(() => {
    if (afterYes) afterYes.classList.remove("hidden");
  }, 800);
}

/* =====================
   HEART TRANSITION
===================== */
function startHearts() {
  let count = 0;

  const burst = setInterval(() => {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 30 + 25 + "px";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 3000);
    }

    count++;
    if (count > 15) clearInterval(burst);
  }, 120);
}
