var handResolver = require('./handResolver');
var action = require('./action');

module.exports = {


  VERSION: "2",

  bet_request: function(gameState, bet) {
    // console.error(gameState);
    var pot = gameState.pot;
    var ourbot = gameState.players[gameState.in_action];
    // ourbot.hole_cards;
    var cards = ourbot.hole_cards;
    console.error('cards:', cards);
    var card1 = cards[0];
    var card2 = cards[1];
    handResolver(cards, function (err, percent) {
      var result;
      if (percent < 40) {
        result = action.fold();
      }

      if ((percent < 80)) {
        result = action.call(gameState.current_buy_in, ourbot.bet);
      }

      else {
        result = action.raise(gameState.current_buy_in, ourbot.bet, gameState.minimum_raise);
      }

      bet(result);
    });

    // part of Artem logic:
    // FIXME TypeError: Cannot read property 'length' of undefined
    // at fill (combination.js:174:40)
    // Artem don't handle strings as numbers.
    // All incoming cards should be numbers. See test/playerTest.js
    //
    // var fillOrdered = combination(cards);
    // console.error(fillOrdered);


    // Function returns 0 if we have small chances to win,
    // minimum value required to make a call if the chances are average
    // and minimum value required to make a raise


  },

  showdown: function(game_state) {

  }
};
