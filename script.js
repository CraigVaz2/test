let pleaLevel = 0;
const pleas = ["Yes ❤️", "Please ❤️", "Pretty please ❤️", "Please… it’s you ❤️", "JUST SAY YES! ❤️"];

function unlock() {
  const code = document.getElementById('passcode').value;
  if (code === "21426") {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('bg-image').style.display = 'none';
    document.getElementById('cinematic-screen').classList.remove('hidden');
    
    // Audio Context Unlock
    const audio = document.getElementById('valentine');
    audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});

    runCinematic();
  } else {
    document.getElementById('error-msg').innerText = "Access Denied.";
  }
}

function runCinematic() {
  const content = document.getElementById('cinematic-content');
  
  // Frame 1: Center
  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text">Do you see the suspect?</h2>`;
  }, 500);

  // Frame 2: Center
  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text">Look closely...</h2>`;
  }, 5500);

  // Frame 3: Bottom
  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text bottom-text">Its you.....</h2>`;
  }, 10500);

  // Frame 4: Reveal Line
  setTimeout(() => {
    content.innerHTML = `<h2 class="fade-text reveal-text">Because you stole my heart 😝</h2>`;
  }, 15500);

  // Final Transition to Proposal
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
    const growth = 1 + (pleaLevel * 0.5);
    yesBtn.style.transform = `scale(${growth})`;
    
    // Move No button randomly
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(${Math.max(0.4, 1 - pleaLevel * 0.1)})`;
    
    if(pleas[pleaLevel]) yesBtn.innerText = pleas[pleaLevel];
  });

  yesBtn.addEventListener('click', () => {
    const audio = document.getElementById('valentine');
    if (audio) audio.play();
    
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
