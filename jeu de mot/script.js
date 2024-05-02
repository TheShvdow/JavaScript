const words = {
    facile: ['chat', 'chien', 'oiseau', 'poisson', 'serpent','java','python','ruby'],
    moyen: ['ordinateur', 'téléphone', 'télévision', 'réfrigérateur', 'micro-ondes','javascript'],
    intermediaire: ['programmation', 'application', 'développement', 'interface', 'utilisateur'],
    difficile: ['anticonstitutionnellement', 'pseudopseudohypoparathyroïdisme', 'floccinaucinihilipilification', 'streptococcophagie', 'pneumonoultramicroscopicsilicovolcanoconiosis']
  };
let currentLevel = 'facile';
let currentWordIndex = 0;
let timeLeft = 10;
let score = 0;
let countdownInterval;

function startGame() {
  currentLevel = document.getElementById('level').value;
  currentWordIndex = 0;
  timeLeft = 10;
  score = 0;
  showWord();
  startCountdown();
}

function showWord() {
  const word = words[currentLevel][currentWordIndex];
  document.getElementById('word').textContent = word;
}

function startCountdown() {
  timeLeft = 10;
  document.getElementById('countdown').textContent = timeLeft;
  countdownInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('countdown').textContent = timeLeft;
    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}

function checkWord() {
  const userWord = document.getElementById('input').value.toLowerCase();
  const currentWord = words[currentLevel][currentWordIndex].toLowerCase();
  if (userWord === currentWord) {
    score++;
    currentWordIndex++;
    timeLeft += 5;
    document.getElementById('countdown').textContent = timeLeft;
    if (currentWordIndex === words[currentLevel].length) {
      currentWordIndex = 0;
      if (currentLevel === 'difficile') {
        endGame();
      } else {
        currentLevel = getNextLevel(currentLevel);
        document.getElementById('level').value = currentLevel;
      }
    }
    showWord();
    document.getElementById('input').value = '';
  }
}

function getNextLevel(currentLevel) {
  switch (currentLevel) {
    case 'facile':
      return 'moyen';
    case 'moyen':
      return 'intermediaire';
    case 'intermediaire':
      return 'difficile';
    case 'difficile':
      return 'facile';
    default:
      return 'facile';
  }
}

function endGame() {
  clearInterval(countdownInterval);
  timeLeft = 0;
  document.getElementById('countdown').textContent = timeLeft;
  document.getElementById('message').textContent = `Score final : ${score}`;
}

document.getElementById('input').addEventListener('input', checkWord);
document.getElementById('start').addEventListener('click', startGame);