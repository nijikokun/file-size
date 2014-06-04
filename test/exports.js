var assert = require('assert')
var filesize = require('../')

describe('exports', function () {
  it('should be a function', function () {
    filesize.should.be.a.Function
  })

  it('invoking should return an object', function () {
    filesize(0).should.be.an.Object
  })
})