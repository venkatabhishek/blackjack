"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Utils = require("./Utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = require('events');

var Game =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Game, _EventEmitter);

  function Game() {
    var _this;

    _classCallCheck(this, Game);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this));
    _this.deck = [];
    _this.status = null;
    _this.round = 0;
    return _this;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.round++; // create deck and shuffle cards

      this.createDeck(6); // use 6 standard decks

      this.shuffleDeck();
    } // create game deck
    // @param {int} numDecks - Number of standard decks to use in game 

  }, {
    key: "createDeck",
    value: function createDeck(numDecks) {
      var deck = [];

      for (var i = 0; i < numDecks; i++) {
        for (var j = 0; j < 3; j++) {
          // 4 suits
          for (var k = 0; k < 12; k++) {
            // 13 cards per suit
            // NOTE: suit of card is irrelevant for Blackjack,
            // so game only keeps track of card value
            deck.push(k);
          }
        }
      }

      this.deck = deck;
    } // shuffle deck via Fisher-Yates algorithm. O(n) time complexity

  }, {
    key: "shuffleDeck",
    value: function shuffleDeck() {
      var deck = this.deck;

      for (var i = deck.length - 1; i >= 1; i--) {
        var j = (0, _Utils.getRandInt)(0, i);
        var temp = deck[j];
        deck[j] = deck[i];
        deck[i] = temp;
      }

      this.deck = deck;
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.deck.pop();
    }
  }]);

  return Game;
}(EventEmitter);

var _default = Game;
exports["default"] = _default;