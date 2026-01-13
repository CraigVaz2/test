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
  console.log("ACCEPT - Simple version");
  
  // Hide/show elements
  if (questionText) questionText.style.display = "none";
  if (choiceButtons) choiceButtons.style.display = "none";
  if (afterYes) {
    afterYes.classList.remove("hidden");
    afterYes.style.display = "block";
  }
  
  // SIMPLE AUDIO PLAY - most reliable
  const audio = document.getElementById('valentine');
  
  // Create a new audio context on user gesture
  document.body.style.cursor = 'pointer';
  
  // Try multiple methods
  const tryPlay = () => {
    // Method 1: Direct play
    audio.play().catch(e1 => {
      console.log("Method 1 failed:", e1);
      
      // Method 2: Create clone and play
      const audioClone = audio.cloneNode();
      audioClone.volume = 1.0;
      audioClone.play().catch(e2 => {
        console.log("Method 2 failed:", e2);
        
        // Method 3: New Audio object
        const newAudio = new Audio(audio.src);
        newAudio.volume = 1.0;
        newAudio.play().catch(e3 => {
          console.log("Method 3 failed:", e3);
          alert("Click anywhere to play music!");
        });
      });
    });
  };
  
  // Trigger play
  tryPlay();
  
  // Also allow clicking anywhere to play
  document.body.onclick = tryPlay;
  
  // Start hearts
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
