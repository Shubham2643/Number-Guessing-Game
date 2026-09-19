(function () {
  const MIN = 1;
  const MAX = 20;

  let secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  let score = 20;
  let highscore = 20;
  let gameActive = true;

  const secretDisplay = document.getElementById("secretDisplay");
  const guessInput = document.getElementById("guessInput");
  const checkBtn = document.getElementById("checkBtn");
  const againBtn = document.getElementById("againBtn");
  const scoreValue = document.getElementById("scoreValue");
  const highscoreValue = document.getElementById("highscoreValue");

  function setFeedback(icon, text, isCorrect = false) {
    const feedbackLine = document.getElementById("feedbackLine");
    const iconSpan = feedbackLine.querySelector(".icon");
    const textSpan = feedbackLine.querySelector("#feedbackText");
    iconSpan.textContent = icon;
    textSpan.textContent = text;
    feedbackLine.style.color = isCorrect ? "#fff9b0" : "#ffffff";
  }

  function updateScores() {
    scoreValue.textContent = score;
    highscoreValue.textContent = highscore;
  }

  function setGameActive(active) {
    gameActive = active;
    guessInput.disabled = !active;
    checkBtn.disabled = !active;
    if (active) guessInput.focus();
  }

  function resetGame() {
    secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    score = 20;
    setGameActive(true);
    secretDisplay.textContent = "?";
    guessInput.value = "";
    setFeedback("💡", "Start guessing...");
    updateScores();
    guessInput.focus();
  }

  function checkGuess() {
    if (!gameActive) return;

    const rawValue = guessInput.value.trim();
    if (rawValue === "") {
      setFeedback("⚠️", "Enter a number!");
      return;
    }

    const guess = Number(rawValue);
    if (!Number.isInteger(guess) || guess < MIN || guess > MAX) {
      setFeedback("⚠️", `Between ${MIN} and ${MAX}`);
      guessInput.value = "";
      return;
    }

    if (guess === secretNumber) {
      setGameActive(false);
      secretDisplay.textContent = secretNumber;
      setFeedback("🎯", "Correct Number!", true);
      if (score > highscore) {
        highscore = score;
        highscoreValue.textContent = highscore;
      }
    } else if (guess < secretNumber) {
      score = Math.max(0, score - 1);
      setFeedback("📉", "Too low!");
      guessInput.value = "";
    } else {
      score = Math.max(0, score - 1);
      setFeedback("📈", "Too high!");
      guessInput.value = "";
    }

    updateScores();
    guessInput.focus();
  }

  checkBtn.addEventListener("click", checkGuess);
  guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkGuess();
    }
  });
  againBtn.addEventListener("click", resetGame);

  window.addEventListener("load", () => {
    guessInput.focus();
    updateScores();
    secretDisplay.textContent = "?";
  });
})();
