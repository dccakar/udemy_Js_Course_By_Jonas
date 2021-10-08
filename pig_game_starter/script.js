'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn-new');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

let score = 0;
//New game set up
btnDice.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0;

const getCurrentPlayer = function() {
  return player1.classList.contains('player--active') ? player1 : player0;
};

const changePlayer = function(player) {
  player.remove('player--active');
  player[1] === 'player--0'
    ? player1.classList.add('player--active')
    : player0.classList.add('player--active');
};
let player = getCurrentPlayer();
const updateScore = function(player, score) {
  if (player.classList[1] === 'player--0') {
    displayScore(0, score);
  } else if (player.classList[1] === 'player--1') {
    displayScore(1, score);
  }
};
const displayScore = function(id, score) {
  if (id) {
    currentScore1.textContent = score;
  } else {
    currentScore0.textContent = score;
  }
};
btnRoll.addEventListener('click', function() {
  const dice = Math.trunc(Math.random() * 6) + 1;
  btnDice.src = `dice-${dice}.png`;
  btnDice.classList.remove('hidden');
  if (dice !== 1) {
    score += dice;
    updateScore(player, score);
  } else {
    score = 0;
    updateScore(player, score);
    changePlayer(player.classList);
    player = getCurrentPlayer();
  }
});

btnHold.addEventListener('click', function() {
  player.classList[1] === 'player--0'
    ? (score0.textContent = score)
    : (score1.textContent = score);
  score = 0;
  updateScore(player, score);
  changePlayer(player.classList);
  player = getCurrentPlayer();
});
