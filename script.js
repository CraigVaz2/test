console.log("Script loaded and running!");

function checkCode() {
  const input = document.getElementById("codeInput");
  const error = document.getElementById("error");

  if (!input || !error) {
    alert("Elements not found");
    return;
  }

  if (input.value.trim() === "1234") {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}

/* =====================
   UNLOCKED PAGE SETUP
   ===================== */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionText = document.getElementById("questionText");
const choiceButtons = document.getElementById("choiceButtons");
const afterYes = document.getElementById("afterYes");

let pleaLevel = 0;

const pleas = [
  "Yes ❤️",
  "Please ❤️",
  "Pretty please ❤️",
  "Pretty please with sprinkles ❤️",
  "Please… it’s you ❤️",
  "Okay fine ❤️"
];

if (noBtn && yesBtn) {
  noBtn.addEventListener("mouseover", resist);
  noBtn.addEventListener("click", resist);
}

function resist(e) {
  e.preventDefault();

  pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);

  // NO shrinks + moves
  noBtn.style.transform =
    `translate(${Math.random() * 200 - 100}px, ${Math.random() * 120 - 60}px)
     scale(${1 - pleaLevel * 0.15})`;
  noBtn.style.opacity = Math.max(0.2, 1 - pleaLevel * 0.2);

  // YES grows
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

function startHeartsBurst() {
  let bursts = 0;

  const interval = setInterval(() => {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 30 + 25 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }

    bursts++;
    if (bursts > 12) clearInterval(interval);
  }, 120);
}

function accept() {
  const song = document.getElementById("valentine");
  
  if (song) {
    // This tells the browser to "wake up" the audio
    song.load(); 
    
    // Use a promise to catch errors and see exactly why it's failing
    const playPromise = song.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Playback started!");
      }).catch(error => {
        console.log("Playback failed: " + error);
        // Fallback: Try playing again after a tiny delay
        setTimeout(() => song.play(), 100);
      });
    }
  }

  startHeartsBurst();

  if (questionText) questionText.style.display = "none";
  if (choiceButtons) choiceButtons.style.display = "none";

  if (afterYes) {
    afterYes.classList.remove("hidden");
  }
}

