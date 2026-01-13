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
  console.log("ACCEPT function called");
  
  // Hide the question and buttons
  if (questionText) {
    questionText.style.opacity = "0";
    questionText.style.transition = "opacity 0.3s ease";
    setTimeout(() => questionText.style.display = "none", 300);
  }
  
  if (choiceButtons) {
    choiceButtons.style.opacity = "0";
    choiceButtons.style.transition = "opacity 0.3s ease";
    setTimeout(() => choiceButtons.style.display = "none", 300);
  }

  // Show after-yes content
  if (afterYes) {
    afterYes.classList.remove("hidden");
    afterYes.style.display = "block";
    afterYes.style.opacity = "0";
    setTimeout(() => {
      afterYes.style.opacity = "1";
      afterYes.style.transition = "opacity 0.5s ease";
    }, 300);
  }

  // Play audio with guaranteed play
  playValentineAudio();
  
  // Start hearts
  startHeartsBurst();
}

function playValentineAudio() {
  const audio = document.getElementById('valentine');
  
  if (!audio) {
    console.error("No audio element found!");
    return;
  }
  
  console.log("Playing valentine audio...");
  
  // CRITICAL: Set volume BEFORE playing
  audio.volume = 0.7;
  audio.currentTime = 0;
  
  // Use a click event to trigger play (browsers allow this)
  const playAudio = () => {
    audio.play()
      .then(() => {
        console.log("🎵 Audio is playing!");
        // Fade in volume
        audio.volume = 0.7;
        setTimeout(() => {
          audio.volume = 1.0;
        }, 500);
      })
      .catch(error => {
        console.log("Audio play failed:", error);
        
        // LAST RESORT: Create a new audio element
        const newAudio = new Audio('./valentine.mp3');
        newAudio.volume = 0.7;
        newAudio.play()
          .then(() => console.log("🎵 Audio playing via new element!"))
          .catch(e => console.log("Final attempt failed:", e));
      });
  };
  
  // Trigger with a simulated user gesture
  playAudio();
  
  // Also bind to any click as backup
  document.addEventListener('click', playAudio, { once: true });
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
