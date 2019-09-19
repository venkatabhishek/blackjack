const EventEmitter = require('events');

class Player extends EventEmitter{
    constructor(money){
        super();

        this.money = money;
        this.hand = [];
    }

    // add card to hand
    // @param {int} card - value of card to add to player hand
    add(card){
        this.hand.push(card);
    }

    

}

export default Player;