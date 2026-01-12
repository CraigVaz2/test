function checkCode() {
  const input = document.getElementById("codeInput");
  const error = document.getElementById("error");

  if (!input || !error) {
    alert("Elements not found");
    return;
  }

  if (input.value.trim() === "1234") {
    window.location.href = "unlocked.html";
  } else {
    error.textContent = "Access denied.";
  }
}
