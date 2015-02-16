var request = require('supertest');
var expect = require('chai').expect;

function pass(done){
  expect(true).to.equals(true);
  done();
}

module.exports =  {
  pass : pass
}