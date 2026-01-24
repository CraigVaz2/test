let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please 🥺", "Pretty please 🥺", "Please please please 🥺", "Don't do this 🥺", "I'm begging 🥺"];

function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  if (input === "21426") {
    document.getElementById("login-ui").classList.add("hidden");
    document.getElementById("cinematic-text").classList.remove("hidden");
    document.body.classList.add("blackout");

    setTimeout(() => { showCinematic("Do you see the suspect?", false); }, 1000);
    setTimeout(() => { showCinematic("Look closely...", false); }, 6500);
    setTimeout(() => { showCinematic("Its you.....", true); }, 12000); 
    setTimeout(() => { showCinematic("...because you stole my heart 😝", false); }, 17500); 

    setTimeout(() => {
      document.body.className = "unlocked"; 
      document.getElementById("main-content").innerHTML = `
        <p style="font-size: 2.5em; margin-bottom: 40px; text-align: center;">Will you be my Valentine?</p>
        <div id="choiceButtons" style="display:flex; justify-content:center; gap:50px;">
          <button class="yes" id="yesBtn">Yes ❤️</button>
          <button class="no" id="noBtn">No</button>
        </div>
        <div id="afterYes" class="hidden" style="margin-top:60px; display: flex; justify-content: center; gap: 40px; font-size: 4.5em;">
             <div style="opacity:0.3">💌</div>
             <div onclick="alert('February 14th @ 7:00 PM. I will pick you up! ❤️')">📅</div>
             <div style="opacity:0.3">🎁</div>
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
  document.getElementById("cinematic-text").innerHTML = `<h2 class="fade-text ${isBottom ? 'bottom-text' : ''}">${text}</h2>`;
}

function resist(e) {
  if (e) e.preventDefault();
  pleaLevel++;
  const moveX = Math.random() * 200 - 100;
  const moveY = Math.random() * 150 - 75;
  window.noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.3, 1 - pleaLevel * 0.1)})`;
  window.yesBtn.style.transform = `scale(${1 + (pleaLevel * 1.8)})`;
  if (pleaLevel > 4) window.yesBtn.style.zIndex = "99999";
  window.yesBtn.textContent = pleas[pleaLevel] || "PLEASE 🥺";
}

function accept() {
  document.getElementById("valentine").play().catch(() => {});
  document.getElementById("main-content").querySelector('p').style.display = "none";
  document.getElementById("choiceButtons").style.display = "none";
  window.afterYes.classList.remove("hidden");
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
