var request = require('supertest');
var sinon = require('sinon');
var expect = require('chai').expect;


//Add the tests that you want to run here.
var SomeTest = require('./integration/example');
var app = require('../app');

describe('Integration tests suite', function() {

  describe('Example', 
    function() {
      it('Should return pass', function(done){
        SomeTest.pass(done, app);
      });
    });

});