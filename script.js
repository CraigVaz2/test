function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const error = document.getElementById("error");

  const correctCode = "1234"; // ← we will change this later

  if (input === correctCode) {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}

