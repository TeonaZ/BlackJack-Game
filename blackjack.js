
var dealerSum = 0;
var userSum = 0;


var dealerAceCount = 0;
var userAceCount = 0; //A, 2 + K -> 1 + 2 +10

var hidden;
var deck;

var restartButton;

var canHit = true; //allows the user to draw while userSum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

//Double loop

function buildDeck() {
    let values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    let types = ["c", "d", "h", "s"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
     for (let j = 0; j < values.length; j++) {
        deck.push(values[j] + "-" + types[i]); //a-c -> k-c, a-d ->k-d
     }
    }
    //console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i< deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.999)
    let temp = deck[i]
    deck[i] = deck [j];
    deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden); //get value of the card
    dealerAceCount += checkAce(hidden);
    //console.log(hidden);
    //console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./assets/cards/4-c.png">   create img tag
       let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./assets/cards/" + card +".png";
       dealerSum += getValue(card);
       dealerAceCount += checkAce(card);
       document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);
 
    //create img tag and pop cards
    for (let i =0; i < 2; i++) {
        let cardImg = document.createElement("img"); //create img tag
        let card = deck.pop(); //pop cards
        cardImg.src = "./assets/cards/" + card +".png";
        userSum += getValue(card);
        userAceCount += checkAce(card);
        document.getElementById("user-cards").append(cardImg);   
    }

    console.log(userSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
     
}
    function hit() {
        if(!canHit) {
            return;
}

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/cards/" + card +".png";
        userSum += getValue(card);
        userAceCount += checkAce(card);
        document.getElementById("user-cards").append(cardImg);  

        if(reduceAce(userSum, userAceCount) > 21) { //a, j, k -> 11 + 10 + 10
            canHit = false;
        }
    }

    function stay() {
        dealerSum = reduceAce(dealerSum, dealerAceCount);
        userSum = reduceAce(userSum, userAceCount);

        canHit = false;
        document.getElementById("hidden").src = "/assets/cards/" + hidden + ".png";

        let message = "";
        if (userSum > 21) {
            message = "User Lose!";
        }
        else if(dealerSum > 21) {
            message = "User Win!";
        }
        //user and dealer <= 21
        else if (userSum == dealerSum){  //same amount
            message = "Tie!";
        }
        else if (userSum > dealerSum) {
            message = "User Win!";
        }
        else if (userSum < dealerSum){
            message = "User Lose!";
        }

        document.getElementById("dealer-sum").innerText = dealerSum;
        document.getElementById("user-sum").innerText = userSum;
        document.getElementById("results").innerText = message;

    }

    function restart() {
        //console.log('test')
        window.location.reload();
        return false; 
        }
  
        document.getElementById('reset').addEventListener("click", restart);
    
    
//get value of the card  
function getValue(card) {
    let data = card.split("-"); // "4-c" -> ["4", "c"] - split the card
    let value = data[0];

    if (isNaN(value)) {     //a=11,1; j,q,k=10
        if (value == "a") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if(card[0] == "a") {
        return 1;
    }
    return 0;
}

function reduceAce(userSum, userAceCount) {
    while (userSum > 21 && userAceCount > 0) {
        userSum -= 10;
        userAceCount -= 1;
    }
    return userSum;
}