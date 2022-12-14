'use strict';

//Scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curentScore0El = document.getElementById('current--0');
const curentScore1El = document.getElementById('current--1');

//Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerName0El = document.getElementById('name--0');
const playerName1El = document.getElementById('name--1');

//Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Dice
const diceEl = document.querySelector('.dice');

let scores, curentScore, activePlayer, playing, win;
let winScores = [0, 0];

const init = function () {
  //Reset values:
  scores = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;
  win = 0;

  //DOM resets:
  score0El.textContent = 0;
  score1El.textContent = 0;
  curentScore0El.textContent = 0;
  curentScore1El.textContent = 0;

  //Hide dice:
  diceEl.classList.add('hidden');

  //Restart players names:
  playerName0El.textContent = 'player 1';
  playerName1El.textContent = 'Player 2';

  //Remove winner class and focus on player 0:
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //Show buttons:
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
init();

const swichPlayer = function () {
  curentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = curentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  diceEl.classList.remove('hidden');
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `img/dice-${dice}.png`;

  if (dice !== 1) {
    curentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      curentScore;
  } else {
    swichPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 15) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
      winScores[activePlayer] += ++win;

      document.getElementById(
        `win--${activePlayer}`
      ).textContent = `TOTAL WIN: ${winScores[activePlayer]}`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //7) Hide roll,hold and dice-pic
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      diceEl.classList.add('hidden');
    } else {
      swichPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
