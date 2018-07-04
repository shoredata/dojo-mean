// Assignment: Deck of Cards
// =========================

// Create a Card class. 
// --------------------------
// A card should have the following functionality:
// Each Card should have a suit ("Hearts", "Clubs", "Diamonds", "Spades")
// Each Card should have a string value (eg, "Ace", "Two", ...., "Queen", "King")
// Each Card should have a numerical value (1-13)
// Each Card should have a show method (log the card's information to the console)


// Create a Deck class. 
// --------------------------
// A deck should have the following functionality:
// The Deck should contain the 52 standard Cards
// The Deck should be able to shuffle
// The Deck should be able to reset
// The Deck should be able to deal a random Card
// Deal should return the Card that was dealt and remove it from the Deck

// Now create a Player class. 
// --------------------------
// A Player should have the following functionality:
// The Player should have a name
// The Player should have a hand (an array of cards taken from a Deck)
// The Player should be able to take a Card (use the deck.deal method)
// The Player should be able to discard a Card

var cardDescriptions = [
    'Ace of Clubs',
    'Two of Clubs',
    'Three of Clubs',
    'Four of Clubs',
    'Five of Clubs',
    'Six of Clubs',
    'Seven of Clubs',
    'Eight of Clubs',
    'Nine of Clubs',
    'Ten of Clubs',
    'Jack of Clubs',
    'Queen of Clubs',
    'King of Clubs',
    'Ace of Diamonds',
    'Two of Diamonds',
    'Three of Diamonds',
    'Four of Diamonds',
    'Five of Diamonds',
    'Six of Diamonds',
    'Seven of Diamonds',
    'Eight of Diamonds',
    'Nine of Diamonds',
    'Ten of Diamonds',
    'Jack of Diamonds',
    'Queen of Diamonds',
    'King of Diamonds',
    'Ace of Hearts',
    'Two of Hearts',
    'Three of Hearts',
    'Four of Hearts',
    'Five of Hearts',
    'Six of Hearts',
    'Seven of Hearts',
    'Eight of Hearts',
    'Nine of Hearts',
    'Ten of Hearts',
    'Jack of Hearts',
    'Queen of Hearts',
    'King of Hearts',
    'Ace of Spades',
    'Two of Spades',
    'Three of Spades',
    'Four of Spades',
    'Five of Spades',
    'Six of Spades',
    'Seven of Spades',
    'Eight of Spades',
    'Nine of Spades',
    'Ten of Spades',
    'Jack of Spades',
    'Queen of Spades',
    'King of Spades'
];
const cardSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const cardValues = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];


// Create a Card class. 
// --------------------------
// A card should have the following functionality:
// Each Card should have a suit ("Hearts", "Clubs", "Diamonds", "Spades")
// Each Card should have a string value (eg, "Ace", "Two", ...., "Queen", "King")
// Each Card should have a numerical value (1-13)
// Each Card should have a show method (log the card's information to the console)

class Card {
    constructor(suitIndex, valueIndex) {
        this.suitidx = suitIndex;
        this.suit = cardSuits[suitIndex];
        this.valueidx = valueIndex;
        this.value = cardValues[valueIndex];
        this.cardnum = suitIndex*13 + valueIndex;
        this.desc = cardDescriptions[(suitIndex)*13 + valueIndex];        
    }
    show(){
        console.log(this.desc);
    }
}

// var c1 = new Card(0,0);
// var c2 = new Card(3,12);
// var c3 = new Card(1, 5);
// c1.show();
// c2.show();
// c3.show();

// Create a Deck class. 
// --------------------------
// A deck should have the following functionality:
// The Deck should contain the 52 standard Cards
// The Deck should be able to shuffle
// The Deck should be able to reset
// The Deck should be able to deal a random Card
// Deal should return the Card that was dealt and remove it from the Deck

// Fisher-Yeates shuffle
// from: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var copy = [], n = array.length, i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    return copy;
}
  

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

class Deck {
    constructor () {
        this.cards = [];
        this.newDeck();
    }

    newDeck() {
        this.resetDeck();
        this.shuffleDeck();
    }

    resetDeck() {
        this.cards.length = 0;
        for (var i = 0; i<=12; i++) {
            for (var j = 0; j <= 3; j++) {
                var card = new Card(j, i);
                // card.show();
                this.cards.push(card);
            }
        }
    };

    shuffleDeck() {
        shuffle(this.cards);
    }

    dealCard() {
        var outgoing = null;
        if (this.cards.length>0){
            outgoing = this.cards.pop();
        }
        // console.log("DEALT: " + outgoing.desc);
        return outgoing;
    }

    showDeck() {
        var sout = [];
        for (var c in this.cards) {
            sout.push(this.cards[c].cardnum);
        }
        console.log(sout);
    }

}

// var d1 = new Deck();
// d1.showDeck();
// d1.shuffleDeck();
// d1.showDeck();
// var hand1 = [];
// hand1.push(d1.dealCard());
// d1.showDeck();
// d1.resetDeck();
// d1.showDeck();


// Now create a Player class. 
// --------------------------
// A Player should have the following functionality:
// The Player should have a name
// The Player should have a hand (an array of cards taken from a Deck)
// The Player should be able to take a Card (use the deck.deal method)
// The Player should be able to discard a Card

class Player {
    constructor(name='default', cards) {
        this.name = name;
        this.cards = cards;
    }
    drawCard(deck) {
        this.cards.push(deck.dealCard());
        return this;
    }
    insertCard(card) {
        this.cards.push(card);
        return this;
    }
    removeCard(card) {
        return this.cards.pop();
    }
    showHand() {
        var sout = [];
        for (var c in this.cards) {
            sout.push(this.cards[c].desc);
        }
        console.log(sout);
    }
    getScore() {
        var isc = 0;
        for (var c in this.cards) {
            if (this.cards[c].valueidx < 9) {
                isc+= this.cards[c].valueidx+1;
            }
            else{
                isc+= 10;
            }
        }
        return isc;
    }
    hasAce() {
        for (var c in this.cards) {
            if (this.cards[c].valueidx==0) {
                return true;
            }
        }
        return false;
    }
}

