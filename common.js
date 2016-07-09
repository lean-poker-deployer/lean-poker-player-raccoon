'use strict';

function activePlayers(players) {
  var count = 0, i;
  for (i = 0; i < players.length; i++) {
    if (players[i]['status'] == 'active') {
      count++;
    }
  }
  return count;
}

function averageActivePlayersStack(players) {
  var sum = 0, result = 0, i;
  for (i = 0; i < players.length; i++) {
    if (players[i]['status'] == 'active') {
      sum = sum + players[i].stack;
    }
  }
  return sum / activePlayers(players);
}

module.exports = {
  activePlayers : activePlayers,
  averageActivePlayersStack : averageActivePlayersStack
};

