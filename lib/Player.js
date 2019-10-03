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

var readlineSync = require('readline-sync');

var EventEmitter = require('events');

var Player =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Player, _EventEmitter);

  function Player(money) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this));
    _this.money = money;
    _this.hand = [];
    return _this;
  } // add card to hand
  // @param {int} card - value of card to add to player hand


  _createClass(Player, [{
    key: "add",
    value: function add(card) {
      this.hand.push(card);
    } // return string representation of hand
    // @param {boolean} mask - if true hide first card - dealer's hole card

  }, {
    key: "handString",
    value: function handString(mask) {
      var temp = this.hand;
      var ret = [];

      if (mask) {
        ret.push('**');
        temp.pop();
      }

      temp.forEach(function (c) {
        ret.push((0, _Utils.cardString)(c));
      });
      return ret.join(" ");
    } // clear hand

  }, {
    key: "clear",
    value: function clear() {
      this.hand = [];
    }
  }, {
    key: "hasBust",
    value: function hasBust() {
      var hand = this.hand;
      var b = hand.reduce(function (acc, curr) {
        return acc + (0, _Utils.cardValue)(curr);
      }, 0);
      if (b > 21) this.emit('bust');
      return b > 21;
    } // detect if player has blackjack

  }, {
    key: "hasBlackjack",
    value: function hasBlackjack() {
      var hand = this.hand;

      if (hand.length == 2) {
        var firstValue = (0, _Utils.cardValue)(hand[0]);
        var secondValue = (0, _Utils.cardValue)(hand[1]);

        if (firstValue == 1 && secondValue == 10) {
          return true;
        } else if (firstValue == 10 && secondValue == 1) {
          return true;
        }

        return false;
      } else {
        return false;
      }
    }
  }, {
    key: "getAction",
    value: function getAction(cb) {
      var inp = readlineSync.question('Next action: ("stand" or "hit") ');

      if (inp != 'stand' && inp != 'hit') {
        console.log("Invalid Option");
        this.getAction(cb);
      } else {
        cb(inp);
      }
    }
  }, {
    key: "handValue",
    value: function handValue() {
      var hand = this.hand;
      var handValue = hand.map(_Utils.cardValue).reverse().sort();
      var max = handValue.reduce(function (acc, curr) {
        if (curr == 1) {
          return acc + 11 > 21 ? acc + 1 : acc + 11;
        } else {
          return acc + curr;
        }
      }, 0);
      return max;
    }
  }]);

  return Player;
}(EventEmitter);

var _default = Player;
exports["default"] = _default;