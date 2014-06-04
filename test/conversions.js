var assert = require('assert')
var filesize = require('../')

var b = 1
var kb = 1024
var mb = 1048576
var gb = 1073741824
var tb = 1099511627776

describe('human readable', function () {
  it('should correctly convert to IEC', function () {
    var options = false

    filesize( b).to('B', options).should.equal(1)
    filesize(kb).to('B', options).should.equal(1024)
    filesize(mb).to('KB', options).should.equal(1024)
    filesize(gb).to('MB', options).should.equal(1024)
    filesize(tb).to('GB', options).should.equal(1024)
  })

  it('should correctly convert to SI', function () {
    var options = true

    filesize( b).to('B', options).should.equal(1)
    filesize(kb).to('B', options).should.equal(1024)
    filesize(mb).to('KB', options).should.equal(1048.58)
    filesize(gb).to('MB', options).should.equal(1073.74)
    filesize(tb).to('GB', options).should.equal(1099.51)
  })
})