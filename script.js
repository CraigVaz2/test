let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please ❤️", "Pretty please ❤️", "Please… it’s you ❤️"];

function unlock() {
  const code = document.getElementById('passcode').value;
  if (code === "21426") {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('bg-image').style.display = 'none';
    document.getElementById('cinematic-screen').classList.remove('hidden');
    
    // Audio Context Unlock for Browsers
    const audio = document.getElementById('valentine');
    audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});

    runCinematic();
  } else {
    document.getElementById('error-msg').innerText = "Access Denied.";
  }
}

function runCinematic() {
  const content = document.getElementById('cinematic-content');
  const frames = ["Do you see the suspect?", "Look closely...", "Its you....."];
  
  frames.forEach((text, i) => {
    setTimeout(() => {
      content.innerHTML = `<h2 class="fade-text">${text}</h2>`;
    }, i * 5500);
  });

  setTimeout(() => {
    document.getElementById('cinematic-screen').classList.add('hidden');
    document.getElementById('proposal-screen').classList.remove('hidden');
    setupProposal();
  }, 17000);
}

function setupProposal() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  noBtn.addEventListener('click', () => {
    pleaLevel++;
    yesBtn.style.transform = `scale(${1 + pleaLevel * 0.5})`;
    noBtn.style.transform = `translate(${Math.random() * 150 - 75}px, ${Math.random() * 100 - 50}px)`;
    if(pleas[pleaLevel]) yesBtn.innerText = pleas[pleaLevel];
  });

  yesBtn.addEventListener('click', () => {
    document.getElementById('valentine').play();
    document.getElementById('choiceButtons').classList.add('hidden');
    document.getElementById('questionText').classList.add('hidden');
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
