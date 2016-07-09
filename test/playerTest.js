'use strict';

var should = require('should');
var player = require('../player');

var common = require('../common');
const handCombination = require('../combination');

var fs = require('fs');
var testGameState;



describe('Bot', function () {

  before(function (done) {
    fs.readFile(__dirname + '/exampleGameState.json', 'utf8', function (err, data) {
      if (err) done(err);
      try {
        let fileContent = JSON.parse(data);
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
  

  it('should launch Artem written combination', function () {
    let hand = [
      {rank: 5, suit: 'spades'},
      {rank: 8, suit: 'clubs'},
      {rank: 5, suit: 'diamonds'},
      {rank: 7, suit: 'spades'},
      {rank: 4, suit: 'spades'},
      {rank: 6, suit: 'diamonds'},
      {rank: 1, suit: 'spades'}
    ];
    console.log(handCombination(hand));

  });

});
