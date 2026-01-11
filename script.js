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
  // Hide choice buttons
  document.getElementById("choiceButtons").style.display = "none";

  // Show new content
  document.getElementById("afterYes").classList.remove("hidden");

  // Play music
  const song = document.getElementById("loveSong");
  song.play();

  // Start hearts
  startHearts();
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
