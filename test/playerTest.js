'use strict';

var should = require('should');
var player = require('../player');
var pjson = require('../package.json');

var common = require('../common');

var fs = require('fs');
var testGameState;

describe('Common', function () {

  before(function (done) {
    fs.readFile(__dirname + '/exampleGameState.json', 'utf8', function (err, data) {
      if (err) done(err);
      try {
        var fileContent = JSON.parse(data);
        testGameState = fileContent.game_state;
        done();
      } catch (error) {
        return done(error);
      }
    });
  });

  it('should return positive integer', function () {
    player.bet_request(testGameState, function (bet) {
      should(bet).be.Number();
      should(bet).be.aboveOrEqual(0);
      // console.log(testGameState);
    });
  });

  it('version should be from Package.json', function () {

    player.VERSION.should.be.equal(pjson.version);
    player.VERSION.should.be.String();

  });


});
