// Utilities for game

const SuitUnicode = {
    'Spades': '\u2660',
    'Diamonds': '\u2665',
    'Hearts': '\u2666',
    'Clubs': '\u2663'
}

export const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs']
export const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

// get random integer between min and max, both inclusive
export function getRandInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// card toString
export function cardString(card){
    return SuitUnicode[card.suit]+card.value
}

// get get value
export function cardValue(card){
    if(typeof(card.value) == "number"){ // 2 - 10
        return card.value
    }else if(card.value == 'A'){ // ace
        return 1;
    }else{ // jack, queen, king
        return 10;
    }
}

