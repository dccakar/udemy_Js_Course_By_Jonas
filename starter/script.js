'use strict';

let number = 0;
let highscore = 0;
let score = 20;
document.querySelector('.check').addEventListener('click', () => {
  game(Number(document.querySelector('input.guess').value));
});

const displayText = function(text) {
  document.querySelector('.message').textContent = text;
};

const createSecret = () => {
  return Math.trunc(Math.random() * 20 + 1);
};

const styling = (color, width, text) => {
  document.querySelector('body').style.backgroundColor = color;
  document.querySelector('.number').textContent = text;
  document.querySelector('.number').style.width = width;
};

const scoring = value => {
  document.querySelector('.score').textContent = value;
};
let secretNumber = createSecret();
console.log(secretNumber);
const game = function(number) {
  if (number === 0) {
    displayText('you cannot enter 0!!');
  } else if (number !== secretNumber && number <= 20) {
    if (score > 0) {
      let message = '';
      score--;
      scoring(score);
      message = number > secretNumber ? 'Too high' : 'Too low';
      displayText(message);
    } else {
      displayText('You loose the game 😅😅😅');
    }
  } else if (number === secretNumber) {
    styling(' #60b347', '450rem', number);
    displayText('You win mf! 🏆🏆🏆');
    highscore > score ? highscore : (highscore = score);
    document.querySelector('.highscore').textContent = highscore;
  } else {
    displayText('Not in boundary...☠☠');
  }
};

document.querySelector('.again').addEventListener('click', function() {
  score = 20;
  secretNumber = createSecret();
  displayText('Start guessing...');
  styling('#222', '15rem', '?');
  scoring(score);
  document.querySelector('.guess').value = '';
});
