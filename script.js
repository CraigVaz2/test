let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please 🥺", "Pretty please 🥺", "Please please please 🥺", "Don't do this 🥺", "You have to say yes 🥺", "I'm begging 🥺"];

function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const loginUI = document.getElementById("login-ui");
  const cinematicText = document.getElementById("cinematic-text");

  if (input === "21426") {
    loginUI.classList.add("hidden");
    cinematicText.classList.remove("hidden");
    document.body.classList.add("blackout");

    setTimeout(() => { showCinematic("Do you see the suspect?", false); }, 1000);
    setTimeout(() => { showCinematic("Look closely...", false); }, 6500);
    setTimeout(() => { showCinematic("Its you.....", true); }, 12000); 
    setTimeout(() => { showCinematic("...because you stole my heart 😝", false); }, 17500); 

    setTimeout(() => {
      document.body.className = "unlocked"; 
      document.getElementById("main-content").innerHTML = `
        <p class="question" id="questionText">Will you be my Valentine?</p>
        <div class="buttons" id="choiceButtons" style="display:flex; justify-content:center; gap:50px;">
          <button class="yes" id="yesBtn">Yes ❤️</button>
          <button class="no" id="noBtn">No</button>
        </div>
        <div class="after-yes hidden" id="afterYes">
           <div class="icon-row">
             <div class="icon" style="opacity:0.4">💌</div>
             <div class="icon" onclick="alert('February 14th @ 7:00 PM. I will pick you up! ❤️')">📅</div>
             <div class="icon" style="opacity:0.4">🎁</div>
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
  
  window.noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.3, 1 - pleaLevel * 0.1)})`;
  
  const newScale = 1 + (pleaLevel * 2); // Extremely fast growth
  window.yesBtn.style.transform = `scale(${newScale})`;
  
  if (pleaLevel > 4) window.yesBtn.style.zIndex = "99999";
  window.yesBtn.textContent = pleas[pleaLevel] || "PLEASE 🥺";
}

function accept() {
  document.getElementById("valentine").play().catch(() => {});
  window.questionText.style.display = "none";
  window.choiceButtons.style.display = "none";
  window.afterYes.classList.remove("hidden");
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
