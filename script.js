/* PASSWORD */
function checkCode() {
  const input = document.getElementById("codeInput");
  const error = document.getElementById("error");

  if (input.value.trim() === "1234") {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}

/* YES / NO LOGIC */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

if (noBtn && yesBtn) {
  let pleaLevel = 0;

  const pleas = [
    "Yes ❤️",
    "Please ❤️",
    "Pretty please ❤️",
    "Pretty please with sprinkles ❤️",
    "Please… it’s you ❤️"
  ];

  noBtn.addEventListener("mouseover", resist);
  noBtn.addEventListener("click", resist);

  function resist(e) {
    e.preventDefault();
    pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 120 - 60;

    noBtn.style.transform =
      `translate(${x}px, ${y}px) scale(${1 - pleaLevel * 0.15})`;
    noBtn.style.opacity =
      Math.max(0.3, 1 - pleaLevel * 0.2);

    yesBtn.textContent = pleas[pleaLevel];

    yesBtn.style.transform =
      `scale(${1 + pleaLevel * 0.3})`;
  }
}

/* HEARTS */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }, 200);
}
