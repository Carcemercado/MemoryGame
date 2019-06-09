/*
 * Create a list that holds all of your cards
 */
//This cardIcons will hold all the HTML icon values.
const cardIcons = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

//Assigns .deck class to cardsContainer.
const cardsContainer = document.querySelector(".deck");
let openCards = []; //Open cardIcons to hold clicked open cards.
let matchedCards = []; //Open cardIcons to hold matched cards.
/*
 * Begins the game
 */
function beginGame() {
  //Function to shuffle cardIcons.
  shuffle(cardIcons);
  //Create cards to display, for loop LOOPS through HTML and creates cards.
  for (let i = 0; i < cardIcons.length; i++) {
    const card = document.createElement("li"); //Creates new li to be used as a card.
    card.classList.add("card"); //Assigns .card class to li created with card constant.
    card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
    cardsContainer.appendChild(card);
    //Add click event to every card.
    clickCard(card);
  }
}
//Click event
function clickCard(card) {
  //Create click event listener for cards.
  card.addEventListener("click", function() {
    console.log(card.innerHTML); //Test code, see if console displays inner HTML on click.
    const currentCard = this;
    const previousCard = openCards[0]; //Code to compare 2 opened cards. checks first element of cardIcons [0] - cardIcons begin at 0 :)

    //Code to handle 1 open card.
    if (openCards.length === 1) {
      card.classList.add("open", "show", "disabled"); //Changes css class based on clicked card.
      openCards.push(this); //Pushes selected cards to openCards variable.
      //Compare function.
      compareCards(currentCard, previousCard);
    } else {
      //Code for when no cards are selected.
      currentCard.classList.add("open", "show", "disabled");
      openCards.push(this); //Pushes selected cards to openCards variable.
    }
  });
}
/*
 * Compare function to compare the cards. Comparison of 2 cards.
 */
function compareCards(currentCard, previousCard) {
  //Compares current card and previous card.
  if (currentCard.innerHTML === previousCard.innerHTML) {
    console.log("Cards matched!"); //Test game logic for a match.
    /*
      Adds css class .match to all matched cards.
      Add .match css class to current card.
      Add .match css class to previous card.
    */
    currentCard.classList.add("match");
    previousCard.classList.add("match"); //
    matchedCards.push(currentCard, previousCard);
    //Resets openCards value after cards are matched.
    openCards = [];
    //Check if the game is over.
    gameOver();
  } else {
    console.log("Card mismatch! Try again!"); //Test game logic for mismatch.
    ////Delays css action by waiting 800 milliseconds.
    setTimeout(function() {
      //Remove .open .show css class //Remove .open .show css class //Removed .disabled css
      currentCard.classList.remove("open", "show", "disabled");
      previousCard.classList.remove("open", "show", "disabled");
      //Resets openCards value after cards are matched.
      openCards = [];
    }, 600);
  }
  //Add moves
  addMoves();
}
function gameOver() {
  if (matchedCards.length === cardIcons.length) {
    //Swal must have <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> link in html to work.
    swal
      .fire({
        title: "Game Over! You Won!",
        type: "success",
        html:
          "Moves: " +
          playerMoves +
          "<br> Rating: " +
          starsContainer.innerHTML +
          "<br> Time: " +
          timeContainer.innerHTML +
          "<br> Play Again?",
        showCancelButton: true
      })
      .then(newGame => {
        if (newGame.value) {
          swal
            .fire({
              title: "New Game Started",
              type: "info",
              text: "Get Ready",
              button: true
            })
            //Code to enable window prior to restarting game.
            .then(restartGame => {
              if (restartGame.value) {
                window.location.href = "index.html";
              }
            });
          //Window redirect to reload game page.
        } else {
          swal.fire("Game Over", "", "error");
        }
      });
  }
}
//***/Begin the game when game is loaded./***///
beginGame();
/*
Restart Game Button
*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function gameRestart() {
  swal
    .fire({
      title: "Restart Game?",
      type: "question",
      text: "This action will reset the game.",
      showCancelButton: true
    })
    //Code to enable window prior to restarting game.
    .then(newGame => {
      if (newGame.value) {
        swal
          .fire({
            title: "New Game Started",
            type: "info",
            text: "Get Ready",
            button: true
          })
          //Code to enable window prior to restarting game.
          .then(restartGame => {
            if (restartGame.value) {
              window.location.href = "index.html";
            }
          });
      } else {
        swal.fire("Let's Play On!", "", "success");
      }
    });
});
/*
Add moves to game, count player clicks.
*/
const movesContainer = document.querySelector(".moves");
let playerMoves = 0;
function addMoves() {
  playerMoves++;
  movesContainer.innerHTML = playerMoves;
  //Adding function to count moves and assign rating based on player moves.
  rating();
}
/*
Add Rating
*/
const starsContainer = document.querySelector(".stars");
//Clear all stars from html document.
starsContainer.innerHTML = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>`;
//Function to assign rating.
function rating() {
  if (playerMoves > 0) {
    starsContainer.innerHTML = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>`;
  }
  if (playerMoves > 10) {
    starsContainer.innerHTML = `<i class="fa fa-star"></i><i class="fa fa-star"></i>`;
  }
  if (playerMoves > 14) {
    starsContainer.innerHTML = `<i class="fa fa-star"></i>`;
  }
}
/*
Add Timer
*/
var start = Date.now();
const timeContainer = document.getElementById("timer");
//Test timer
console.log("starting timer...");
//Interval to update timer every second.
var timer = setInterval(function() {
  let time = Date.now() - start;
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  document.getElementById(
    "timer"
  ).innerHTML = `Minutes: ${minutes} Seconds: ${seconds}`;
  //Stop Timer
  if (matchedCards.length === cardIcons.length) {
    clearInterval(timer);
  }
}, 1000);

// Shuffle function from http://stackoverflow.com/a/2450976s
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
