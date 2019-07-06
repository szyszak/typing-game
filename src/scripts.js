const game = document.querySelector('.game');
const words = [
  'panda',
  'clock',
  'notebook',
  'movie',
  'Blade Runner',
  'The Great Gatsby',
  'giGabYte',
  'WHerEveR',
  'SckOluRtPeFd',
];

let currentWord = [];
let errors = 0;
let gameStarted = false;

const renderWord = (word) => {
  game.innerHTML = null;
  currentWord = [];

  for (const char of word) {
    const span = document.createElement('span');
    span.textContent = char;

    currentWord.push({
      char,
      elem: span,
    });
    game.appendChild(span);
  }

  words.shift();
};

const startGame = () => {
  renderWord(words[0]);
  gameStarted = true;
};

const handleInput = (ev) => {
  if (!gameStarted && ev.key === 'Enter') {
    startGame();
    return;
  }

  if (gameStarted) {
    if (ev.key === currentWord[0].char) {
      currentWord[0].elem.classList.add('correct');
      currentWord.shift();

      if (currentWord.length === 0) {
        renderWord(words[0]);
      }
    } else {
      errors++;
      console.log(errors);
    }
  }
};

window.addEventListener('keyup', handleInput);
