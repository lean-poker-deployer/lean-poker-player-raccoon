var winston = require('winston');

function calculateActivePlayers(game_state) {
  var count = 0;
  game_state.players.forEach(function (player) {
    if (player.status === 'active') {
      count++;
    }
  });
  return count;
}

function isPreFlop(game_state) {
  return game_state.community_cards.length === 0;
}

function isBetExist(game_state) {
  if (isPreFlop(game_state)) {
    return game_state.current_buy_in <= 2 * game_state.small_blind;
  }
  return game_state.current_buy_in === 0;
}

module.exports = {
  bet_request: function (game_state, bet) {

    winston.error('Game State:', game_state);
    let players = calculateActivePlayers(game_state);
    let stack = game_state.players[game_state.in_action].stack;
    let min_save_stack = 0.8 * 1000 * players;

    if (isPreFlop(game_state)) {
      //Only two playes left
      if (players === 2) {
        bet(stack)
      }
      //Try steal
      if (stack >= min_save_stack && !isBetExist(game_state)) {
        bet(game_state.minimum_raise);
      }
    } else {
      //Call every bet on postFlop
      bet(game_state.current_buy_in);
    }
  },

  showdown: function (game_state) {

  }
};
