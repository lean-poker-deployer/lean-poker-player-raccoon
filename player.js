'use strict';

var handResolver = require('./handResolver');
var action = require('./action');
var startHandRanger = require('./startHand/startHand');

module.exports = {

  VERSION: '2.0.0',

  bet_request: function (game_state, bet) {

    var players = 0;

    game_state.players.forEach(function (player) {
      if (player.status === 'active') {
        players++;
      }
    });

    var ourbot = gameState.players[gameState.in_action];
    var cardsRang = startHandRanger(ourbot.hole_cards);
    var stackSize = ourbot.stack/gameState.small_blind;

    if (foldOrAllIn(players, cardsRang, stackSize) === 'fold') {
      bet(0);
    } else {
      bet(ourbot.stack);
    }

  },

  showdown: function(game_state) {

  }
};

/*
 players more - less agressive 2-7
 cardsRang more - less agressive 1 - 100
 stackSize less - more agressive
 */
function foldOrAllIn(players, cardsRang, stackSize) {
  if(cardsRang < 0.03) {
    return 'allin';
  }
  if (cardsRang * players  >  stackSize / 10) {
    return 'allin';
  }

  return 'fold';
}
