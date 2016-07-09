'use strict';

var action = require('../action');
var should = require('should');

describe('action', function () {
   it('should return 0 on actionFold', function (){
       var foldResult = action.fold();
       foldResult.should.be.equal(0);
       foldResult.should.be.Number();
   });
    it('should return 240 on actionCall', function (){
        var foldResult = action.call('320', '80');
        foldResult.should.be.equal(240);
        foldResult.should.be.Number();
    });
    it('should return 480 on actionRaise', function (){
        var foldResult = action.raise('320', '80', '240');
        foldResult.should.be.equal(480);
        foldResult.should.be.Number();
    })

});