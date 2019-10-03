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
    _this.players = [];
    _this.deck = [];
    _this.status = null;
    _this.round = 0;
    return _this;
  }

  _createClass(Game, [{
    key: "init",
    value: function init(players, numDecks) {
      this.round = 1;
      this.players = players; // dealer = players[0]
      // create deck and shuffle cards

      this.createDeck(numDecks);
      this.shuffleDeck();
      console.log('Deck built and shuffled.');
    }
  }, {
    key: "deal",
    value: function deal(numCards) {
      var _this2 = this;

      for (var i = 0; i < numCards; i++) {
        this.players.forEach(function (p) {
          p.add(_this2.deck.pop());
        });
      }
    } // create game deck
    // @param {int} numDecks - Number of standard decks to use in game, or "shoe"

  }, {
    key: "createDeck",
    value: function createDeck(numDecks) {
      var deck = [];

      for (var i = 0; i < numDecks; i++) {
        _Utils.suits.forEach(function (s) {
          _Utils.cards.forEach(function (c) {
            deck.push({
              suit: s,
              value: c
            });
          });
        });
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
    } // clear all player hands

  }, {
    key: "clear",
    value: function clear() {
      this.players.forEach(function (p) {
        p.clear();
      });
    }
  }, {
    key: "hit",
    value: function hit(p) {
      p.add(this.deck.pop());
    }
  }, {
    key: "dealerAction",
    value: function dealerAction() {
      var players = this.players;
      var dealer = players[0];

      if (dealer.handValue() < 17) {
        this.hit(dealer);
      }
    }
  }, {
    key: "showdown",
    value: function showdown() {
      var players = this.players;
      var dealer = players[0],
          player = players[1];

      if (dealer.handValue() > player.handValue()) {
        dealer.emit('win');
      } else {
        player.emit('win');
      }

      this.emit('round');
    } // process state of game after each action

  }, {
    key: "check",
    value: function check() {
      var players = this.players;
      var dealer = players[0],
          player = players[1]; // dealer blackjack

      if (dealer.hasBlackjack()) {
        dealer.emit('blackjack');

        if (player.hasBlackjack()) {
          player.emit('blackjack');
          console.log("PUSH");
          this.emit('round');
        } else {
          dealer.emit('win');
          this.emit('round');
        } // player blackjack

      } else if (player.hasBlackjack()) {
        player.emit('blackjack');
        player.emit('win');
        this.emit('round');
      } else {
        var playerBust = player.hasBust();
        var dealerBust = dealer.hasBust();
        var that = this;

        if (!playerBust && !dealerBust) {
          player.getAction(function (action) {
            switch (action) {
              case 'hit':
                that.hit(player);
                that.dealerAction();
                player.emit('hit');
                that.check();
                break;

              case 'stand':
                that.showdown();
                break;
            }
          });
        } else if (dealerBust) {
          player.emit('win');
          this.emit('round');
        } else {
          dealer.emit('win');
          this.emit('round');
        }
      }
    }
  }]);

  return Game;
}(EventEmitter);

var _default = Game;
exports["default"] = _default;