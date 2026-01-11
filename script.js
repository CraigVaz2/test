/* PASSWORD */
function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const error = document.getElementById("error");
  const correctCode = "1234"; // replace later

  if (input === correctCode) {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}

/* NO BUTTON DODGE */
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("questionText");

let pleaLevel = 0;

const pleas = [
  "Will you be my Valentine?",
  "Please be my Valentine?",
  "Pretty please be my Valentine?",
  "Pretty please with sprinkles be my Valentine?",
  "Pretty please with extra sprinkles and a cherry on top be my Valentine?"
];

if (noBtn) {
  noBtn.addEventListener("mouseover", dodgeNo);
  noBtn.addEventListener("touchstart", dodgeNo);
}

function dodgeNo() {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (pleaLevel < pleas.length - 1) pleaLevel++;
  question.textContent = pleas[pleaLevel];
  noBtn.style.opacity = Math.max(0.3, 1 - pleaLevel * 0.15);
}

/* YES CLICK */
function accept() {
  const song = document.getElementById("loveSong");

  if (song) {
    song.volume = 0.6;
    song.currentTime = 0;
    song.play().catch(err => console.log("Audio blocked:", err));
  }

  document.getElementById("response").textContent =
    "Case closed. I’m really glad it’s you. ❤️";

  startHearts();
  showAfterYesButtons();
}


/* HEART ANIMATION */
function startHearts() {
  const container = document.getElementById("hearts-container");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }, 300);
}
