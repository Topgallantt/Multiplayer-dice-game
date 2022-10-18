'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerName0El = document.getElementById('name--0');
const playerName1El = document.getElementById('name--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, curentScore, activePlayer, playing;

// Starting contitions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  curentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //(1): Generting  a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //(2): Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    //(3): Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      curentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    }
    //if (dice === 1), let's move on to the next player.
    else {
      //Swich to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add the current score of the active player
    scores[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if the control result is greater than or equal to 100. (>=100)
    if (scores[activePlayer] >= 100) {
      playing = false;

      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = `Winner !`;

      //If so, end the game
    } else {
      //If not, change to another player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
