function checkCode() {
  const input = document.getElementById("codeInput");
  const error = document.getElementById("error");

  if (!input) return;

  if (input.value.trim() === "1234") {
    startCinematic();
  } else {
    error.textContent = "Access denied.";
  }
}

function startCinematic() {
  const body = document.body;
  const loginUI = document.getElementById("login-ui");
  const cinematic = document.getElementById("cinematic-text");
  const container = document.getElementById("main-content");

  // HARD SWITCH TO BLACKOUT
  body.classList.add("blackout");

  // Kill login UI
  loginUI.classList.add("hidden");

  // Kill container visuals COMPLETELY
  container.classList.add("cinematic-mode");

  cinematic.classList.remove("hidden");

  showLine("It was you.", () => {
    setTimeout(() => {
      window.location.href = "unlocked.html";
    }, 1200);
  });
}

function showLine(text, callback) {
  const cinematic = document.getElementById("cinematic-text");
  cinematic.innerHTML = `<div class="fade-text">${text}</div>`;

  setTimeout(() => {
    if (callback) callback();
  }, 5000);
}
