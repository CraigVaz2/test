let pleaLevel = 0;
// Updated with your requested puppy eyes 🥺
const pleas = [
  "Yes ❤️", 
  "Please 🥺", 
  "Pretty please 🥺", 
  "Please please please 🥺", 
  "Don't do this 🥺", 
  "You have to say yes 🥺", 
  "I'm begging 🥺"
];

function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const loginUI = document.getElementById("login-ui");
  const cinematicText = document.getElementById("cinematic-text");

  if (input === "21426") {
    loginUI.classList.add("hidden");
    cinematicText.classList.remove("hidden");
    document.body.classList.add("blackout");

    // Cinematic Sequence - 5.5 second gaps for suspense
    setTimeout(() => { showCinematic("Do you see the suspect?", false); }, 1000);
    setTimeout(() => { showCinematic("Look closely...", false); }, 6500);
    setTimeout(() => { showCinematic("Its you.....", true); }, 12000); 
    
    // Punchline shot with emoji 😝
    setTimeout(() => { showCinematic("...because you stole my heart 😝", false); }, 17500); 

    // Final Reveal at 23 seconds
    setTimeout(() => {
      document.body.className = "unlocked"; 
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = `
        <p class="question" id="questionText" style="font-family: Georgia, serif; font-size: 2.5em;">Will you be my Valentine?</p>
        <div class="buttons" id="choiceButtons">
          <button class="yes" id="yesBtn">Yes ❤️</button>
          <button class="no" id="noBtn">No</button>
        </div>
        <div class="after-yes hidden" id="afterYes">
           <div class="icon-row">
             <div class="icon locked">💌<span>🔒</span></div>
             <div class="icon active" onclick="alert('February 14th @ 7:00 PM. I will pick you up! ❤️')">📅</div>
             <div class="icon locked">🎁<span>🔒</span></div>
           </div>
        </div>`;
      
      window.yesBtn = document.getElementById("yesBtn");
      window.noBtn = document.getElementById("noBtn");
      window.questionText = document.getElementById("questionText");
      window.choiceButtons = document.getElementById("choiceButtons");
      window.afterYes = document.getElementById("afterYes");

      window.noBtn.addEventListener("mouseover", resist);
      window.noBtn.addEventListener("click", resist);
      window.yesBtn.addEventListener("click", accept);
    }, 23000);
  } else {
    document.getElementById("error").textContent = "Access denied.";
  }
}

function showCinematic(text, isBottom) {
  const div = document.getElementById("cinematic-text");
  div.innerHTML = `<h2 class="fade-text ${isBottom ? 'bottom-text' : ''}">${text}</h2>`;
}

function resist(e) {
  if (e) e.preventDefault();
  pleaLevel++;
  
  const moveX = Math.random() * 300 - 150;
  const moveY = Math.random() * 200 - 100;
  
  // No button shrinks
  window.noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.3, 1 - pleaLevel * 0.1)})`;

  // Yes button grows (Higher multiplier to ensure it covers the page)
  const newScale = 1 + (pleaLevel * 1.5); 
  window.yesBtn.style.transform = `scale(${newScale})`;
  
  // High Z-index so it eventually covers everything
  if (pleaLevel > 5) window.yesBtn.style.zIndex = "99999";

  // Update text with puppy eyes
  if (pleas[pleaLevel]) {
    window.yesBtn.textContent = pleas[pleaLevel];
  } else {
    window.yesBtn.textContent = "PLEASE 🥺";
  }
}

function accept() {
  document.getElementById("valentine").play().catch(() => {});
  // Hide UI
  window.questionText.style.display = "none";
  window.choiceButtons.style.display = "none";
  // Show Icons
  window.afterYes.classList.remove("hidden");
  window.afterYes.style.display = "block";
  startHeartsBurst();
}

function startHeartsBurst() {
  let bursts = 0;
  const interval = setInterval(() => {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.position = "fixed";
      heart.style.top = "-5vh";
      heart.style.animation = "fall 3s linear forwards";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
    if (++bursts > 15) clearInterval(interval);
  }, 200);
}
