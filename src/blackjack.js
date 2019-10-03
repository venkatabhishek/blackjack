const readlineSync = require('readline-sync');
import Game from './Game';
import Player from './Player'

// config variables
let initMoney = 500; // initial money given to player
let numDecks = 6; // number of decks to use in game
let input; // command line input

let start = () => {

    console.log("Starting game...")

    let dealer = new Player(null);
    let player = new Player(initMoney);
    let game = new Game();    

    // events

    dealer.on('blackjack', () => {
        console.log("Dealer blackjack!")
    })

    dealer.on('win', () => {
        console.log("Dealer wins!")
    })

    dealer.on('bust', () => {
        console.log("Dealer bust")
    })

    player.on('blackjack', () => {
        console.log("Player blackjack!")
    })

    player.on('win', () => {
        console.log("Player wins!")
    })

    player.on('bust', () => {
        console.log("Player bust")
    })

    player.on('hit', () => {    
        console.log("Dealer:", dealer.handString())
        console.log("Player:", player.handString())
    })
    
    game.on('round', () => {

        console.log(`Round ${game.round} Over`);

        game.clear()
        game.round++;
    })

    game.init([dealer, player], numDecks);

    // command line input
    while (input != 'n') {

        game.deal(2);

        console.log("Dealer:", dealer.handString())
        console.log("Player:", player.handString())
        
        game.check();

        input = readlineSync.question('Play next round:([y]/n) ');

    }


}

// start process
start();