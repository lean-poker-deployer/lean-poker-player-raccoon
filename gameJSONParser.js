// http://live.leanpoker.org/api/tournament/5758fe417b226c0003000003/game
var request = require('request');

var options = {
  url: 'http://live.leanpoker.org/api/tournament/5758fe417b226c0003000003/game',
  gzip: true
}

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    try {
      var result = JSON.parse(body);
      console.log(result);
    } catch (e) {
      console.error(e)
    }
  }
})
