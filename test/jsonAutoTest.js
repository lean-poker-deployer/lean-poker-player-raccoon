'use strict';

var should = require('should');

var player = require('../player');

var fs = require('fs');
var path = require('path');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}


readFiles(path.resolve(__dirname, 'fixters/') + '/', function onFileContent(filename, content) {
  var resultJson;
  try {
    resultJson = JSON.parse(content);
    console.log(resultJson);
  } catch (e) {
    console.log('cannot JSON parse');
    throw e;
  }
  describe(filename, function () {
    if (resultJson.skipped) {
      it('is skipped');
      return;
    }
    it(resultJson.description, function () {
      player.bet_request(resultJson.game_state, function (bet) {
        bet.should.be.equal(resultJson.expected);
      });

    });

  });
}, function onError(err) {
  if (err) {
    throw err;
  }
});
