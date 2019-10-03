const EventEmitter = require('events');
import { getRandInt, suits, cards } from './Utils';

class Game extends EventEmitter {
    constructor() {
        super();

        this.players = [];
        this.deck = [];
        this.status = null;
        this.round = 0;
    }

    init(players, numDecks) {
        this.round = 1;
        this.players = players; // dealer = players[0]

        // create deck and shuffle cards
        this.createDeck(numDecks);
        this.shuffleDeck();
        console.log('Deck built and shuffled.')

    }

    deal(numCards) {

        for (var i = 0; i < numCards; i++) {
            this.players.forEach(p => {
                p.add(this.deck.pop());
            })
        }

    }

    // create game deck
    // @param {int} numDecks - Number of standard decks to use in game, or "shoe"
    createDeck(numDecks) {

        let deck = [];

        for (var i = 0; i < numDecks; i++) {
            suits.forEach(s => {
                cards.forEach(c => {
                    deck.push({
                        suit: s,
                        value: c,
                    });
                })
            })
        }

        this.deck = deck;

    }

    // shuffle deck via Fisher-Yates algorithm. O(n) time complexity
    shuffleDeck() {

        let { deck } = this;

        for (var i = deck.length - 1; i >= 1; i--) {
            let j = getRandInt(0, i);
            let temp = deck[j];
            deck[j] = deck[i];
            deck[i] = temp;
        }

        this.deck = deck;

    }

    // clear all player hands
    clear() {
        this.players.forEach(p => {
            p.clear();
        })
    }

    hit(p) {
        p.add(this.deck.pop());
    }

    dealerAction() {

        const { players } = this;
        let dealer = players[0];

        if (dealer.handValue() < 17) {
            this.hit(dealer);
        }

    }

    showdown() {

        const { players } = this;
        let dealer = players[0], player = players[1];

        if (dealer.handValue() > player.handValue()) {
            dealer.emit('win')
        } else {
            player.emit('win')
        }

        this.emit('round')

    }


    // process state of game after each action
    check() {

        const { players } = this;
        let dealer = players[0], player = players[1];


        // dealer blackjack
        if (dealer.hasBlackjack()) {
            dealer.emit('blackjack')

            if (player.hasBlackjack()) {
                player.emit('blackjack')

                console.log("PUSH")
                this.emit('round')
            } else {
                dealer.emit('win')
                this.emit('round')
            }

            // player blackjack
        } else if (player.hasBlackjack()) {
            player.emit('blackjack')
            player.emit('win')
            this.emit('round')
        } else {

            let playerBust = player.hasBust();
            let dealerBust = dealer.hasBust();
            let that = this;

            if (!playerBust && !dealerBust) {

                player.getAction(function (action) {
                    switch (action) {
                        case 'hit':
                            that.hit(player)
                            that.dealerAction();
                            player.emit('hit')
                            that.check();
                            break;
                        case 'stand':
                            that.showdown();
                            break;
                    }

                });

            } else if (dealerBust) {
                player.emit('win')
                this.emit('round')
            } else {
                dealer.emit('win')
                this.emit('round')
            }


        }

    }

}


export default Game;