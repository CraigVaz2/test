let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please ❤️", "Pretty please ❤️", "Pretty please with sprinkles ❤️", "Please… it’s you ❤️", "Okay fine ❤️"];

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

    setTimeout(() => {
      document.body.className = "unlocked"; 
      document.getElementById("main-content").innerHTML = `
        <h1 style="color: #222; font-family: Georgia, serif;">...because you stole my heart.</h1>
        <p class="question" id="questionText">Will you be my Valentine?</p>
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
    }, 18000);
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
  pleaLevel = Math.min(pleaLevel + 1, pleas.length - 1);
  window.noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 120 - 60}px) scale(${1 - pleaLevel * 0.15})`;
  window.yesBtn.textContent = pleas[pleaLevel];
  window.yesBtn.style.transform = `scale(${1 + pleaLevel * 0.35})`;
}

function accept() {
  document.getElementById("valentine").play().catch(() => {});
  window.questionText.style.display = "none";
  window.choiceButtons.style.display = "none";
  window.afterYes.classList.remove("hidden");
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
