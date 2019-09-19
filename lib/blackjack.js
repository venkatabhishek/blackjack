"use strict";

var _Game = _interopRequireDefault(require("./Game"));

var _Player = _interopRequireDefault(require("./Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var readlineSync = require('readline-sync');

// config variables
var initMoney = 500;

var start = function start() {
  var dealer = new _Player["default"](null);
  var player = new _Player["default"](initMoney);
  var game = new _Game["default"]();
  console.log("Starting game...");
  game.start();
  console.log("Deck built.");
  var input; // command line input

  while (input != 'quit') {
    input = readlineSync.question('Next action:');
    console.log(game.pop());
  }
};

start();