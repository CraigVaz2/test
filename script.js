function checkCode() {
  const code = document.getElementById("passcode").value;
  if (code === "21426") {
    // Move to Cinematic
    document.getElementById("screen-login").classList.add("hidden");
    document.getElementById("screen-cinematic").classList.remove("hidden");
    startCinematic();
  } else {
    document.getElementById("error-msg").innerText = "Wrong code.";
  }
}

function startCinematic() {
  const container = document.getElementById("cinematic-content");
  const phrases = [
    "Do you see the suspect?",
    "Look closely...",
    "It's you..."
  ];

  phrases.forEach((text, i) => {
    setTimeout(() => {
      container.innerHTML = `<h2 class="fade-text">${text}</h2>`;
    }, i * 5000);
  });

  // Transition to Question
  setTimeout(() => {
    document.getElementById("screen-cinematic").classList.add("hidden");
    document.getElementById("screen-question").classList.remove("hidden");
    document.getElementById("screen-question").style.display = "flex";
  }, phrases.length * 5000);
}

// Button Logic
document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  let growth = 1;

  noBtn.addEventListener("click", () => {
    growth += 0.5;
    yesBtn.style.transform = `scale(${growth})`;
    noBtn.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
  });

  yesBtn.addEventListener("click", () => {
    document.getElementById("screen-question").classList.add("hidden");
    document.getElementById("screen-final").classList.remove("hidden");
    document.getElementById("screen-final").classList.add("active");
  });
});
