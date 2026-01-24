let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please ❤️", "Pretty please ❤️", "Please… it’s you ❤️"];

function unlock() {
  const code = document.getElementById('passcode').value.trim();
  if (code === "21426") {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('bg-image').style.display = 'none';
    document.getElementById('cinematic-screen').classList.remove('hidden');
    
    // Wake up audio
    const audio = document.getElementById('valentine');
    audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});

    runCinematic();
  } else {
    document.getElementById('error-msg').innerText = "Access Denied.";
  }
}

function runCinematic() {
  const content = document.getElementById('cinematic-content');
  
  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text">Do you see the suspect?</h2>`;
  }, 500);

  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text">Look closely...</h2>`;
  }, 5500);

  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text bottom-text">Its you.....</h2>`;
  }, 10500);

  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text pink-text">Because you stole my heart 😝</h2>`;
  }, 15500);

  setTimeout(() => {
    document.getElementById('cinematic-screen').classList.add('hidden');
    document.getElementById('proposal-screen').classList.remove('hidden');
    setupProposal();
  }, 20500);
}

function setupProposal() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  noBtn.addEventListener('click', () => {
    pleaLevel++;
    yesBtn.style.transform = `scale(${1 + pleaLevel * 0.4})`;
    noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px)`;
    if(pleas[pleaLevel]) yesBtn.innerText = pleas[pleaLevel];
  });

  yesBtn.addEventListener('click', () => {
    document.getElementById('valentine').play();
    document.getElementById('choiceButtons').classList.add('hidden');
    document.getElementById('questionText').innerText = "Yay! ❤️";
    document.getElementById('afterYes').classList.remove('hidden');
    
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-5vh";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, 200);
  });
}
