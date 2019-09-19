const readlineSync = require('readline-sync');
import Game from './Game';
import Player from './Player'

// config variables
let initMoney = 500; // initial money given to player
let numDecks = 6; // number of decks to use in game

let start = () => {

    console.log("Starting game...")

    let dealer = new Player(null);
    let player = new Player(initMoney);
    let game = new Game();    

    game.init([dealer, player], numDecks);

    let input;


    // command line input
    while (input != 'quit') {
        input = readlineSync.question('Next action:');
        console.log(game.pop());
    }


}



start();