var player = require('./player');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res){
  res.send(200, 'OK')
});

app.post('/', function(req, res){
  if(req.body.action == 'bet_request') {
    let gameState;
    try {
      gameState = JSON.parse(req.body.game_state);
      console.log('game state in parse:',gameState);
    } catch (e) {
      console.error(500, 'problem with parsing JSON: ' + e.message);
      gameState = req.body.game_state;
    }
    player.bet_request(gameState, function(bet) {
      res.send(200, bet.toString());
    });
  } else if(req.body.action == 'showdown') {
    player.showdown(JSON.parse(req.body.game_state));
    res.send(200, 'OK');
  } else if(req.body.action == 'version') {
    res.send(200, player.VERSION);
  } else {
    res.send(200, 'OK')
  }

});

port = parseInt(process.env['PORT'] || 1337);
host = "0.0.0.0";
app.listen(port, host);
console.log('Listening at http://' + host + ':' + port)
