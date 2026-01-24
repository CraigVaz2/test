let pleaLevel = 0;
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
  if (input === "21426") {
    document.getElementById("login-ui").classList.add("hidden");
    document.getElementById("cinematic-text").classList.remove("hidden");
    document.body.classList.add("blackout");

    // Cinematic Sequence
    setTimeout(() => { showCinematic("Do you see the suspect?", false); }, 1000);
    setTimeout(() => { showCinematic("Look closely...", false); }, 6500);
    setTimeout(() => { showCinematic("Its you.....", true); }, 12000); 
    setTimeout(() => { showCinematic("...because you stole my heart 😝", false); }, 17500); 

    // Final Reveal
    setTimeout(() => {
      document.body.className = "unlocked"; 
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML = `
        <p style="font-size: 2.5em; margin-bottom: 40px;">Will you be my Valentine?</p>
        <div id="choiceButtons" style="display:flex; justify-content:center; gap:50px;">
          <button class="yes" id="yesBtn">Yes ❤️</button>
          <button class="no" id="noBtn">No</button>
        </div>
        <div id="afterYes" class="hidden" style="margin-top:60px;">
           <div class="icon-row">
             <div class="icon" style="opacity:0.3">💌</div>
             <div class="icon" onclick="alert('February 14th @ 7:00 PM. I will pick you up! ❤️')">📅</div>
             <div class="icon" style="opacity:0.3">🎁</div>
           </div>
        </div>`;
      
      window.yesBtn = document.getElementById("yesBtn");
      window.noBtn = document.getElementById("noBtn");
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
  
  // No button flies away
  window.noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.3, 1 - pleaLevel * 0.1)})`;

  // Yes button grows to cover page
  const newScale = 1 + (pleaLevel * 1.5); 
  window.yesBtn.style.transform = `scale(${newScale})`;
  
  if (pleaLevel > 5) window.yesBtn.style.zIndex = "99999";

  window.yesBtn.textContent = pleas[pleaLevel] || "PLEASE 🥺";
}

function accept() {
  document.getElementById("valentine").play().catch(() => {});
  document.getElementById("main-content").querySelector('p').style.display = "none";
  document.getElementById("choiceButtons").style.display = "none";
  window.afterYes.classList.remove("hidden");
  window.afterYes.style.display = "block";
  
  startHeartsBurst();
}

function startHeartsBurst() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-5vh";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }, 150);
}
