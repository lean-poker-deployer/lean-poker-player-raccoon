'use strict';

var should = require('should');
var player = require('../player');

var common = require('../common');

var fs = require('fs');
var testGameState;



describe('Bot', function () {

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
      bet.should.be.equal(240);
      console.log(testGameState);
    });
  });

  it.skip('should do some', function () {
    if (0 === 0) {
      throw new Error();
    }

  });


  it('should check callAmount', function () {
    var result;

    result = common.callAmount(5, 5);
    result.should.be.equal(0);

    result = common.callAmount(320, 80);
    result.should.be.equal(240);

    should.throws(function () {
      common.callAmount(80, 320);
    });
  });



});
