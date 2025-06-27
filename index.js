let player = {
    name: "Player",
    chips: 50
}
const suits = ["♠", "♥", "♦", "♣"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let deck = []
let playerCards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let isAlive = false
//let message = ""
let messageEl = document.getElementById("message-el")
let sumDisplayDealer = document.getElementById("dealer-sum")
let cardDisplayDealer = document.getElementById("dealer-card")
let sumDisplayPlayer = document.getElementById("player-sum")
let cardDisplayPlayer = document.getElementById("player-card")
let playerId = document.getElementById("player-id")

playerId.textContent = `${player.name}: $${player.chips}`

function startGame() {
    isAlive = true
    player.chips -= 10; // Misalnya, jika player mulai bermain, kurangi 10 chips
    updateMoney()
    messageEl.textContent = ""
    createDeck()
    playerCards = [deck.pop(), deck.pop()] //misal [{"10","♥"},{"9","♣"}]
    dealerCards = [deck.pop(), deck.pop()]
    renderGame(playerCards,cardDisplayPlayer, sumDisplayPlayer)
    renderGame(dealerCards,cardDisplayDealer, sumDisplayDealer)
    playerSum = calculate(playerCards)
    dealerSum = calculate(dealerCards)
}

function renderGame(cards, displayCard, displaySum) {
    displayCard.textContent = "cards: "
    for(i=0; i<cards.length;i++){
    displayCard.innerHTML += `<span class="display-card">${cards[i].value} ${cards[i].suit}</span>`
    displaySum.textContent = `sum: ${calculate(cards)}`    
    }
    //<span>aabc</span> playerCards[1].value playerCards[1].suit
    //parseInt(cards[i].value)
}


function newCard() {
if (!isAlive) {
        messageEl.textContent = "Please start a new game.";
        return;
    }
   playerCards.push(deck.pop())
   renderGame(playerCards,cardDisplayPlayer, sumDisplayPlayer)
   if (calculate(dealerCards) < 17){
    dealerCards.push(deck.pop())
    renderGame(dealerCards, cardDisplayDealer, sumDisplayDealer)
   }
    playerSum = calculate(playerCards)
    dealerSum = calculate(dealerCards)

    if (playerSum > 21) {
        messageEl.textContent = "Out of luck! The dealer wins.";
        isAlive = false;
        updateMoney()
    }
    else if (dealerSum > 21 && playerSum <= 21) {
        messageEl.textContent = "Congratulations, you beat the dealer!";
        isAlive = false;
        player.chips += 20; // Misalnya, jika dealer kalah, tambahkan 10 chips
        updateMoney() 
    }
   //bila jumlah kartu lawan <17maka draw
    }


function createDeck(){
    deck = []
    for (let suit of suits){
        for (let value of values){
        deck.push({value, suit})
        }
    }
    deck = deck.sort(() => 0.5 - Math.random())
}

function stand(){
    if (calculate(dealerCards) < 17){
    dealerCards.push(deck.pop())
    renderGame(dealerCards, cardDisplayDealer, sumDisplayDealer)
   }
    playerSum = calculate(playerCards)
    dealerSum = calculate(dealerCards)
    endGame()
}

function calculate(cards){
    let valueCard = 0;
    let aceCount = 0;
    for (let i = 0; i < cards.length; i++) {
        let val = cards[i].value;

        if (val === "J" || val === "Q" || val === "K") {
            valueCard += 10;
        } else if (val === "A") {
            valueCard += 11;
            aceCount++; // hitung berapa banyak Ace
        } else {
            valueCard += parseInt(val);
        }
    }
    // Jika total lebih dari 21 dan ada Ace, kurangi 10 untuk setiap Ace
    while (valueCard > 21 && aceCount > 0) {
        valueCard -= 10;
        aceCount--;
    }

    return valueCard;
}

function endGame(){
    if (playerSum > 21) {
        messageEl.textContent = "Out of luck! The dealer wins.";
        isAlive = false;
        updateMoney()
    } else if (dealerSum > 21) {
        messageEl.textContent = "Congratulations, you beat the dealer!";
        isAlive = false;
        player.chips += 20; // Misalnya, jika dealer kalah, tambahkan 10 chips
        updateMoney()
    } else if (playerSum === dealerSum) {
        messageEl.textContent = "It's a draw!";
        player.chips += 10
        updateMoney()
    } else if (playerSum > dealerSum) {
        messageEl.textContent = "Congratulations, you beat the dealer!";
        player.chips += 20; // Misalnya, jika player menang, tambahkan 10 chips
        updateMoney()
    } else {
        messageEl.textContent = "Out of luck! The dealer wins.";
        updateMoney()
    }
    isAlive = false;

}

function depositMoney() {
    player.chips += parseInt(document.getElementById("deposit-amount").value);
    updateMoney()
    document.getElementById("deposit-amount").value = "";    
} 

function updateMoney(){
    document.getElementById("player-id").textContent = `${player.name}: $${player.chips}`;
}