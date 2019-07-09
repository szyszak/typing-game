class Game {
  constructor() {
    this.words = [
      'movie',
      'clock',
      'panda',
      'book',
      'phone',
      // 'coffee',
      // 'duck',
      // 'glove',
      // 'music',
      // 'door',
      'Blade Runner',
      'The Great Gatsby',
      'Washington Monument',
      'Game Of Thrones',
      'Deep Purple',
      // 'Bohemian Rhapsody',
      // 'Leonardo da Vinci',
      // 'Metal Gear Solid',
      // 'Hotel California',
      // 'The Beatles',
      'nEVerMiNd',
      'INconSiSTenT',
      'whAtEVer',
      'sTeREotyPe',
      'exPeRImEnt',
      // 'aDvenTuRE',
      // 'GiGAbyTe',
      // 'AirPlaNe',
      // 'pacKaGE',
      // 'wARtHOg',
    ];
    this.wordIndex = 0;
    this.currentWord = [];
    this.timer = null;
    this.errors = 0;
    this.gameStarted = false;

    this.$wordView = document.getElementById('word-view');
    this.$timerView = document.getElementById('timer');
    this.$errorsView = document.getElementById('errors');

    this.handleInput = this.handleInput.bind(this);
  }

  init() {
    window.addEventListener('keypress', this.handleInput);
  }

  renderWord(word) {
    if (this.wordIndex === this.words.length) {
      this.endGame();
      return;
    }

    this.$wordView.innerHTML = null;
    this.currentWord = [];

    for (const char of word) {
      const span = document.createElement('span');
      span.textContent = char;

      this.currentWord.push({
        char,
        elem: span,
      });
      this.$wordView.appendChild(span);
    }

    this.wordIndex++;
  }

  startGame() {
    this.gameStarted = true;
    this.$timerView.textContent = '00:00';
    this.$errorsView.textContent = this.errors;
    this.startTimer();
    this.renderWord(this.words[this.wordIndex]);
  }

  startTimer() {
    const timerStart = Date.now();

    this.timer = window.setInterval(() => {
      const now = Date.now();
      const difference = now - timerStart;
      const currentTime = new Date(difference);
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      const seconds = String(currentTime.getSeconds()).padStart(2, '0');

      this.timerStr = `${minutes}:${seconds}`;
      this.$timerView.textContent = `${minutes}:${seconds}`;
    }, 100);
  }

  endGame() {
    clearInterval(this.timer);
    this.gameStarted = false;
    this.wordIndex = 0;
    this.$wordView.textContent = `Congratulations! You finished this game in ${
      this.timerStr
    } with ${this.errors} errors. Press "enter" to try again.`;
    this.errors = 0;
  }

  handleInput(ev) {
    if (!this.gameStarted && ev.key === 'Enter') {
      this.startGame();
      return;
    }

    if (this.gameStarted) {
      if (ev.key === this.currentWord[0].char) {
        this.currentWord[0].elem.classList.add('correct');
        this.currentWord.shift();

        if (this.currentWord.length === 0) {
          this.renderWord(this.words[this.wordIndex]);
        }
      } else {
        this.errors++;
        this.$errorsView.textContent = this.errors;
      }
    }
  }
}

const game = new Game();
game.init();
