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

// 1. ATTACH CLICKS TO BUTTONS
if (noBtn) {
  noBtn.addEventListener("mouseover", resist);
  noBtn.addEventListener("click", resist);
  noBtn.addEventListener("touchstart", resist);
}

if (yesBtn) {
  yesBtn.addEventListener("click", function() {
    console.log("Yes button was clicked!");
    accept(); 
  });
}

// 2. THE RESIST FUNCTION (Moves the No button)
function resist(e) {
  if (e) e.preventDefault();

  pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);

  noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 120 - 60}px) scale(${1 - pleaLevel * 0.15})`;
  noBtn.style.opacity = Math.max(0.2, 1 - pleaLevel * 0.2);

  yesBtn.textContent = pleas[pleaLevel];
  yesBtn.style.transform = `scale(${1 + pleaLevel * 0.35})`;

  if (pleaLevel === pleas.length - 1) {
    yesBtn.style.position = "fixed";
    yesBtn.style.top = "0";
    yesBtn.style.left = "0";
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100vh";
    yesBtn.style.fontSize = "3em";
    yesBtn.style.zIndex = "999";
    yesBtn.style.borderRadius = "0";
    
    // Ensure the giant full-screen button also triggers accept
    yesBtn.onclick = accept;
  }
}

// 3. THE ACCEPT FUNCTION (Plays music and shows hearts)
function accept() {
  console.log("Running accept function...");
  const song = document.getElementById("valentine");
  
  if (song) {
    song.volume = 1.0;
    song.play()
      .then(() => console.log("Audio playing successfully!"))
      .catch(err => console.error("Audio failed to play:", err));
  }

  if (questionText) questionText.style.display = "none";
  if (choiceButtons) choiceButtons.style.display = "none";

  if (afterYes) {
    afterYes.classList.remove("hidden");
    afterYes.style.display = "block"; 
  }
  
  startHeartsBurst();
}

// 4. THE HEARTS FUNCTION
function startHeartsBurst() {
  let bursts = 0;
  const interval = setInterval(() => {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 3000);
    }
    bursts++;
    if (bursts > 15) clearInterval(interval);
  }, 200);
}
