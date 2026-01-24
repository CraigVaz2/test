/* GENERAL */
body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000 !important;
}

/* LOCKED STATE & BACKGROUND */
body.locked {
  color: #eaeaea;
  font-family: "Courier New", monospace;
}

body.location::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("house.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  z-index: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  pointer-events: none;
}

.container {
  max-width: 420px;
  padding: 30px;
  border: 1px solid #444;
  position: relative;
  z-index: 10;
  background: rgba(15, 15, 15, 0.9);
  text-align: center;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 15px;
  background: #111;
  border: 1px solid #555;
  color: #fff;
  font-size: 16px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  cursor: pointer;
  background: #ff4d6d;
  color: white;
  border: none;
  font-weight: bold;
}

.error {
  margin-top: 10px;
  color: #ff6666;
}

/* CINEMATIC & BLACKOUT FIX */
#login-ui.hidden {
  display: none !important;
}

body.blackout {
  background: black !important;
}

body.blackout::before {
  display: none !important;
}

/* SMASH THE GHOST BOX */
body.blackout .container {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  outline: none !important;
}

.fade-text {
  font-family: "Courier New", monospace;
  color: white;
  font-size: 1.8rem;
  animation: fadeInOut 5s forwards;
  text-align: center;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}

.bottom-text {
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

/* UNLOCKED STATE */
body.unlocked {
  background: #ffffff !important;
  color: #222 !important;
  font-family: Georgia, serif;
}

body.unlocked::before {
  display: none !important;
}

body.unlocked .container {
  border: none !important;
  background: transparent !important;
  max-width: 600px;
}

.question {
  font-size: 2em;
  margin-top: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 40px;
}

.yes {
  background: #ff4d6d;
  color: white;
  border-radius: 50px;
  border: none;
  padding: 15px 30px;
}

.no {
  background: #ccc;
  color: #333;
  border-radius: 50px;
  border: none;
  padding: 15px 30px;
}

.hidden { display: none; }

.icon-row {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 60px;
}

.icon { font-size: 4.5em; position: relative; }

.heart {
  position: fixed;
  color: #ff4d6d;
  font-size: 20px;
  z-index: 9999;
  animation: fall 3s linear forwards;
}

@keyframes fall {
  0% { transform: translateY(-10vh); opacity: 1; }
  100% { transform: translateY(110vh); opacity: 0; }
}
