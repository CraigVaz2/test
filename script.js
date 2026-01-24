let pleaCount = 0;
const pleas = ["Yes ❤️", "Please ❤️", "Pretty please ❤️", "Please… it’s you ❤️", "I'm begging ❤️"];

function unlock() {
  const code = document.getElementById('codeInput').value;
  if (code === "21426") {
    // 1. Hide Login and Background
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('bg-image').style.display = 'none';
    
    // 2. Start Cinematic
    document.getElementById('cinematic-screen').classList.remove('hidden');
    runCinematic();
  } else {
    document.getElementById('error').textContent = "Incorrect Passcode.";
  }
}

function runCinematic() {
  const content = document.getElementById('cinematic-content');
  
  const sequence = [
    { text: "Do you see the suspect?", bottom: false, delay: 1000 },
    { text: "Look closely...", bottom: false, delay: 6500 },
    { text: "Its you.....", bottom: true, delay: 12000 }
  ];

  sequence.forEach(item => {
    setTimeout(() => {
      content.innerHTML = `<h2 class="fade-in-out ${item.bottom ? 'bottom-text' : ''}">${item.text}</h2>`;
    }, item.delay);
  });

  // Final Transition to White Screen
  setTimeout(() => {
    document.getElementById('cinematic-screen').classList.add('hidden');
    document.getElementById('proposal-screen').classList.remove('hidden');
  }, 18000);
}

// Logic for No/Yes
document.addEventListener('DOMContentLoaded', () => {
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');

  const moveNo = () => {
    pleaCount = Math.min(pleaCount + 1, pleas.length - 1);
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(${1 - (pleaCount * 0.1)})`;
    yesBtn.style.transform = `scale(${1 + (pleaCount * 0.4)})`;
    yesBtn.textContent = pleas[pleaCount];
  };

  noBtn.addEventListener('mouseover', moveNo);
  noBtn.addEventListener('click', moveNo);

  yesBtn.addEventListener('click', () => {
    document.getElementById('valentineAudio').play();
    document.getElementById('main-q').classList.add('hidden');
    document.querySelector('.btn-group').classList.add('hidden');
    document.getElementById('success-icons').classList.remove('hidden');
    
    // Falling hearts
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
});
