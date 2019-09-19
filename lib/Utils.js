"use strict";

// Utilities for game
// get random integer between min and max, both inclusive
var getRandInt = function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  getRandInt: getRandInt
};