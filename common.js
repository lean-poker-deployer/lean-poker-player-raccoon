module.exports = {

  callAmount: function (current_buy_in, current_bet_of_player) {
    if (current_buy_in === current_bet_of_player) {
      return 0;
    }
    if (current_buy_in > current_bet_of_player) {
      return current_buy_in - current_bet_of_player;
    } else {
      throw new Error('current_buy_in cannot be less then current bet');
    }
  }

};
