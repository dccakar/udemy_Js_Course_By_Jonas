'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

let score = 0;
let playing = true;
//New game set up
btnDice.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0;
let generalScore0 = 0;
let generalScore1 = 0;

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
const generalScoreUpdate = function(id, generalScore) {
  if (!id) {
    generalScore0 += generalScore;
    score0.textContent = generalScore0;
  } else {
    generalScore1 += generalScore;
    score1.textContent = generalScore1;
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
  if (playing) {
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
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    player.classList[1] === 'player--0'
      ? generalScoreUpdate(0, score)
      : generalScoreUpdate(1, score);
    score = 0;
    updateScore(player, score);
    if (generalScore0 > 20) {
      playing = false;
      btnDice.classList.add('hidden');
      player0.classList.remove('player--active');
      player0.classList.add('player--winner');
    } else if (generalScore1 > 20) {
      playing = false;
      btnDice.classList.add('hidden');
      player1.classList.remove('player--active');
      player1.classList.add('player--winner');
    } else {
      changePlayer(player.classList);
      player = getCurrentPlayer();
    }
  }
});

btnNew.addEventListener('click', function() {
  playing = true;
  score = 0;
  generalScore0 = 0;
  generalScore1 = 0;
  if (!btnDice.classList.contains('hidden')) {
    btnDice.classList.add('hidden');
  }
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player = getCurrentPlayer();
  if (player1.classList.contains('player--winner')) {      // No need to check, js remove even if the class is not there ( also adds even if class is there)
    player1.classList.remove('player--winner');
  }
  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  }
  if (player.classList[1] === 'player--1') {
    player.classList.remove('player--active');
  }
  if (!player0.classList.contains('player--active')) {
    player0.classList.toggle('player--active');
  }
  generalScoreUpdate(0, 0);
  generalScoreUpdate(1, 0);
});
