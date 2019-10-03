"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandInt = getRandInt;
exports.cardString = cardString;
exports.cardValue = cardValue;
exports.cards = exports.suits = void 0;
// Utilities for game
var SuitUnicode = {
  'Spades': "\u2660",
  'Diamonds': "\u2665",
  'Hearts': "\u2666",
  'Clubs': "\u2663"
};
var suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
exports.suits = suits;
var cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']; // get random integer between min and max, both inclusive

exports.cards = cards;

function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // card toString


function cardString(card) {
  return SuitUnicode[card.suit] + card.value;
} // get get value


function cardValue(card) {
  if (typeof card.value == "number") {
    // 2 - 10
    return card.value;
  } else if (card.value == 'A') {
    // ace
    return 1;
  } else {
    // jack, queen, king
    return 10;
  }
}