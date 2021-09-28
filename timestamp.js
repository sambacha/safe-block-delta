'use strict';

// Unix timestamp calculator
module.exports = function unix() {
    // Date.now function returns timestamp in milliseconds
    // convert to seconds
    // node -e 'console.log(Date.now())'
  return Math.floor(Date.now()/1000.0);
  console.log(unix):
};