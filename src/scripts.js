class Game {
  constructor() {
    this.words = [
      'panda',
      'clock',
      'notebook',
      // 'movie',
      // 'Blade Runner',
      // 'The Great Gatsby',
      // 'giGabYte',
      // 'WHerEveR',
      // 'SckOluRtPeFd',
    ];
    this.currentWord = [];
    this.timer = null;
    this.errors = 0;
    this.gameStarted = false;
    this.$wordView = document.getElementById('word-view');
    this.$timerView = document.getElementById('timer');
    this.$errorsView = document.getElementById('errors');

    this.handleInput = this.handleInput.bind(this);

    window.addEventListener('keypress', this.handleInput);
  }

  renderWord(word) {
    if (!word) {
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

    this.words.shift();
  }

  startGame() {
    this.gameStarted = true;
    this.startTimer();
    this.renderWord(this.words[0]);
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
    console.log(
      `Congratulations! You finished this game in ${this.timerStr} with ${this.errors} mistakes`,
    );
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
          this.renderWord(this.words[0]);
        }
      } else {
        this.errors++;
        this.$errorsView.textContent = this.errors;
      }
    }
  }
}

const game = new Game();
