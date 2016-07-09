module.exports = {
  activePlayers : function(players) {
    var count = 0, i;
    for (i = 0; i < players.length; i++) {
      if (players[i]['status'] == 'active') {
        count++;
      }
    }
    return count;
  }
};
