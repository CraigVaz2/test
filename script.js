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

if (noBtn) {
  noBtn.addEventListener("mouseover", resist);
  noBtn.addEventListener("click", resist);
}

function resist(e) {
  e.preventDefault();

  pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);

  // Move + shrink NO
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform =
    `translate(${x}px, ${y}px) scale(${1 - pleaLevel * 0.15})`;
  noBtn.style.opacity =
    Math.max(0.3, 1 - pleaLevel * 0.2);

  // Grow YES + change text ON BUTTON
  yesBtn.style.transform =
    `scale(${1 + pleaLevel * 0.25})`;
  yesBtn.textContent = pleas[pleaLevel];
}



/* HEART ANIMATION */

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
