'use strict';

var common = require('../common');
var should = require('should');

var players = [
  {
    "id": 0,
    "name": "Albert",
    "status": "active",
    "version": "Default random player",
    "stack": 1010,
    "bet": 320
  },
  {
    "id": 1,
    "name": "Bob",
    "status": "active",
    "version": "Default random player",
    "stack": 1590,
    "bet": 80,
    "hole_cards": [
      {
        "rank": "6",
        "suit": "hearts"
      },
      {
        "rank": "K",
        "suit": "spades"
      }
    ]
  },
  {
    "id": 2,
    "name": "Chuck",
    "status": "out",
    "version": "Default random player",
    "stack": 0,
    "bet": 0
  }
];


describe('common', function () {
  it('should return Number', function (){
    var playersActive = common.activePlayers(players);
    playersActive.should.be.Number();
    playersActive.should.be.equal(2);
  });

});
