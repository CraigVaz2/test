console.log("Script loaded and running!");

function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const loginUI = document.getElementById("login-ui");
  const cinematicText = document.getElementById("cinematic-text");
  const overlay = document.getElementById("bg-overlay");

  if (input === "21426") {
    loginUI.classList.add("hidden");
    cinematicText.classList.remove("hidden");
    if (overlay) overlay.remove(); 
    document.body.classList.add("blackout");

    // Sequence with adjusted positions
    setTimeout(() => { showCinematic("Do you see the suspect?", false); }, 1000);
    setTimeout(() => { showCinematic("Look closely...", false); }, 6000);
    // This one goes to the bottom for the reflection
    setTimeout(() => { showCinematic("Its you.....", true); }, 11000); 

    setTimeout(() => {
      document.body.className = "unlocked"; 
      document.body.style.background = "#fff";
      
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = `
        <h1 style="color: #222; font-family: Georgia, serif;">...because you stole my heart.</h1>
        <p class="question" id="questionText">Will you be my Valentine?</p>
        <div class="buttons" id="choiceButtons">
          <button class="yes" id="yesBtn">Yes ❤️</button>
          <button class="no" id="noBtn">No</button>
        </div>
        <div class="after-yes hidden" id="afterYes">
           <div class="icon-row">
             <div class="icon locked">💌<span>🔒</span></div>
             <div class="icon active" onclick="alert('February 14th: Our Favorite Spot @ 7:00 PM')">📅</div>
             <div class="icon locked">🎁<span>🔒</span></div>
           </div>
        </div>
      `;
      
      // FIX: Manually re-assigning buttons to global variables
      window.yesBtn = document.getElementById("yesBtn");
      window.noBtn = document.getElementById("noBtn");
      window.questionText = document.getElementById("questionText");
      window.choiceButtons = document.getElementById("choiceButtons");
      window.afterYes = document.getElementById("afterYes");

      attachValentineLogic();
    }, 16000);

  } else {
    document.getElementById("error").textContent = "Access denied.";
  }
}

function showCinematic(text, isBottom) {
  const cinematicText = document.getElementById("cinematic-text");
  const positionClass = isBottom ? "bottom-text" : "";
  cinematicText.innerHTML = `<h2 class="fade-text ${positionClass}">${text}</h2>`;
}

function attachValentineLogic() {
  // Use window variables to ensure the resist/accept functions can see them
  if (window.noBtn) {
    window.noBtn.addEventListener("mouseover", resist);
    window.noBtn.addEventListener("click", resist);
    window.noBtn.addEventListener("touchstart", resist);
  }
  
  if (window.yesBtn) {
    window.yesBtn.addEventListener("click", accept); 
  }
}
// Ensure the "accept" function you already have handles the music and hearts.

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
  // We use window.pleaLevel to track globally
  if (typeof window.pleaLevel === 'undefined') window.pleaLevel = 0;
  
  window.pleaLevel = Math.min(window.pleaLevel + 1, pleas.length - 1);

  window.noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 120 - 60}px) scale(${1 - window.pleaLevel * 0.15})`;
  window.yesBtn.textContent = pleas[window.pleaLevel];
  window.yesBtn.style.transform = `scale(${1 + window.pleaLevel * 0.35})`;
}

// 3. THE ACCEPT FUNCTION (Plays music and shows hearts)
function accept() {
  const song = document.getElementById("valentine");
  if (song) {
    song.play().catch(e => console.log("Audio play blocked"));
  }

  window.questionText.style.display = "none";
  window.choiceButtons.style.display = "none";
  window.afterYes.classList.remove("hidden");
  window.afterYes.style.display = "block";
  
  startHeartsBurst();
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
