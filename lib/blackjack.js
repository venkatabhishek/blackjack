"use strict";

var _Game = _interopRequireDefault(require("./Game"));

var _Player = _interopRequireDefault(require("./Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var readlineSync = require('readline-sync');

// config variables
var initMoney = 500; // initial money given to player

var numDecks = 6; // number of decks to use in game

var input; // command line input

var start = function start() {
  console.log("Starting game...");
  var dealer = new _Player["default"](null);
  var player = new _Player["default"](initMoney);
  var game = new _Game["default"](); // events

  dealer.on('blackjack', function () {
    console.log("Dealer blackjack!");
  });
  dealer.on('win', function () {
    console.log("Dealer wins!");
  });
  dealer.on('bust', function () {
    console.log("Dealer bust");
  });
  player.on('blackjack', function () {
    console.log("Player blackjack!");
  });
  player.on('win', function () {
    console.log("Player wins!");
  });
  player.on('bust', function () {
    console.log("Player bust");
  });
  player.on('hit', function () {
    console.log("Dealer:", dealer.handString());
    console.log("Player:", player.handString());
  });
  game.on('round', function () {
    console.log("Round ".concat(game.round, " Over"));
    game.clear();
    game.round++;
  });
  game.init([dealer, player], numDecks); // command line input

  while (input != 'n') {
    game.deal(2);
    console.log("Dealer:", dealer.handString());
    console.log("Player:", player.handString());
    game.check();
    input = readlineSync.question('Play next round? ([y]/n) ');
  }
}; // start process


start();