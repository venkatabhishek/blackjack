const readlineSync = require('readline-sync');
const EventEmitter = require('events');
import { cardString, cardValue } from './Utils';

class Player extends EventEmitter {
    constructor(money) {
        super();

        this.money = money;
        this.hand = [];
    }

    // add card to hand
    // @param {int} card - value of card to add to player hand
    add(card) {
        this.hand.push(card);
    }

    // return string representation of hand
    // @param {boolean} mask - if true hide first card - dealer's hole card
    handString(mask) {

        var temp = this.hand;

        let ret = [];

        if (mask) {
            ret.push('**')
            temp.pop();
        }

        temp.forEach(c => {
            ret.push(cardString(c))
        })

        return ret.join(" ");

    }

    // clear hand
    clear() {
        this.hand = []
    }
    
    hasBust() {

        const { hand } = this;

        var b = hand.reduce((acc, curr) => {
            return acc + cardValue(curr);
        }, 0)

        if(b > 21) this.emit('bust')

        return b > 21;

    }

    // detect if player has blackjack
    hasBlackjack() {

        const { hand } = this;

        if (hand.length == 2) {

            var firstValue = cardValue(hand[0]);
            var secondValue = cardValue(hand[1])

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

    getAction(cb){
        let inp = readlineSync.question('Next action: ("stand" or "hit") ');
        if(inp != 'stand' && inp != 'hit'){
            console.log("Invalid Option")
            this.getAction(cb)
        }else{
            cb(inp)
        } 
    }

    handValue(){

        const { hand } = this;
        
        let handValue = hand.map(cardValue).reverse().sort();

        let max = handValue.reduce((acc, curr) => {
            if(curr == 1){
                return (acc+11 > 21) ? acc + 1 : acc + 11 
            }else{
                return acc + curr
            }
        }, 0)

        return max;


    }


}

export default Player;