const EventEmitter = require('events');
import { getRandInt } from './Utils';

class Game extends EventEmitter{
    constructor(){
        super();

        this.players = [];
        this.deck = [];
        this.status = null;
        this.round = 0;
    }

    init(players, numDecks){
        this.round = 1;
        this.players = players;

        // create deck and shuffle cards
        this.createDeck(numDecks);
        this.shuffleDeck();
        console.log('Deck built and shuffled.')
        
    }

    deal(numCards){
        
        this.players.forEach(p => {
            
        })

    }

    // create game deck
    // @param {int} numDecks - Number of standard decks to use in game, or "shoe"
    createDeck(numDecks){

        let deck = [];

        for(var i = 0; i < numDecks; i++){
            for(var j = 0; j < 3; j++){ // 4 suits
                for(var k = 0; k < 12; k++) { // 13 cards per suit
                    // NOTE: suit of card is irrelevant for Blackjack,
                    // so game only keeps track of card value
                    deck.push(k);
                }
            }
        }

        this.deck = deck;

    }

    // shuffle deck via Fisher-Yates algorithm. O(n) time complexity
    shuffleDeck(){

        let { deck } = this;

        for(var i = deck.length - 1; i >= 1; i--){
            let j = getRandInt(0, i);
            let temp = deck[j];
            deck[j] = deck[i];
            deck[i] = temp;
        }

        this.deck = deck;

    }

    pop(){
        return this.deck.pop();
    }






}


export default Game;