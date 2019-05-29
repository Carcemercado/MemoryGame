/*
 * Create a list that holds all of your cards
 */
//This array will hold all the HTML icon values.
const cardIcons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", 
                    "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
                    "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

//Assigns .deck class to cardsContainer.
const cardsContainer = document.querySelector(".deck");
let openCards = [];//Open array to hold clicked open cards.
let matchedCards = [];

/*
* Begins the game
*/
function beginGame(){
    //Create cards to display, for loop LOOPS through HTML and creates cards.
    for (let i = 0; i < cardIcons.length; i++) {
        const card = document.createElement("li");//Creates new li to be used as a card.
        card.classList.add("card");//Assigns .card class to li created with card constant.
        card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
        cardsContainer.appendChild(card);
        //Add click event to every card. 
        clickCard(card);
    }
}

    //Click event
    function clickCard(card){
    //Create click event listener for cards.
    card.addEventListener("click", function (){
        console.log(card.innerHTML);//Test code, see if console displays inner HTML on click.
        
        const currentCard = this;
        const previousCard = openCards[0];//Code to compare 2 opened cards. checks first element of array [0] - arrays begin at 0 :)

        //Code to handle 1 open card.
        if(openCards.length === 1){

            card.classList.add("open", "show", "disabled");//Changes css class based on clicked card.
            openCards.push(this);//Pushes selected cards to openCards variable.
        //Compare function.
        compare(currentCard, previousCard);

        } else{
        //Code for when no cards are selected.
            currentCard.classList.add("open", "show", "disabled");
            openCards.push(this);//Pushes selected cards to openCards variable.
        }
    });
}

/*
* Compare function to compare the cards. Comparison of 2 cards.
*/
function compare(currentCard, previousCard){
    if (currentCard.innerHTML === previousCard.innerHTML) {//Compares current card and previous card.
        console.log("Cards matched!");//Test game logic for a match.

        /*
        Adds css class .match to all matched cards.
        Add .match css class to current card.
        Add .match css class to previous card.
        */
        currentCard.classList.add("match");
        previousCard.classList.add("match");//
        matchedCards.push(currentCard, previousCard);
        //Resets openCards value after cards are matched.
        openCards = [];

        //Check if the game is over.
        gameOver();
    } else {
        console.log("Card mismatch! Try again!");//Test game logic for mismatch.

        ////Delays css action by waiting 800 milliseconds.
        setTimeout(function () {
            //Remove .open .show css class //Remove .open .show css class
            currentCard.classList.remove("open", "show");
            previousCard.classList.remove("open", "show");
            //Resets openCards value after cards are matched.
            openCards = [];
        }, 800);
    }
}

function gameOver(){
    if (matchedCards.length === cardIcons.length){
        alert("Game Over, You Won!")
    }
}

//***/Begin the game when game is loaded./***///
beginGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
