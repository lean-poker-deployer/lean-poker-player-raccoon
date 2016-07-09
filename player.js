'use strict';

var handResolver = require('./handResolver');
var action = require('./action');
var startHandRanger = require('./startHand/startHand');
var pjson = require('./package.json');

module.exports = {

  VERSION: pjson.version,

  bet_request: function (game_state, bet) {

    var players = 0;
    var max_stack = 0;

    game_state.players.forEach(function (player) {
      if (player.status === 'active') {
        players++;
        if(player.id != game_state.in_action) {
          max_stack = Math.max(max_stack, player.stack + player.bet);
        }
      }
    });

    var ourbot = game_state.players[game_state.in_action];
    var hand_rang = startHandRanger(ourbot.hole_cards);
    var stack_size = ourbot.stack/max_stack;

    if (foldOrAllIn(players, hand_rang, stack_size) === 'fold') {
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
function foldOrAllIn(players, hand_rang, stack_size) {
  if(stack_size > 1 && hand_rang < 0.10 * stack_size) {
    return 'allin';
  }
  if (hand_rang < 0.02) {
    return 'allin';
  }

  return 'fold';
}
