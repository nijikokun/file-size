var assert = require('assert')
var filesize = require('../')

var b = 1
var kb = 1024
var mb = 1048576
var gb = 1073741824
var tb = 1099511627776

describe('to()', function () {
  it('should fallback to B when no unit is passed', function () {
    assert(filesize(b).to()       === '1.00')
  })

  it('should correctly convert to IEC', function () {
    assert(filesize( b).to('B')   === '1.00')
    assert(filesize(kb).to('B')   === '1024.00')
    assert(filesize(mb).to('KB')  === '1024.00')
    assert(filesize(gb).to('MB')  === '1024.00')
    assert(filesize(tb).to('GB')  === '1024.00')
  })

  it('should correctly convert to SI', function () {
    assert(filesize( b).to('B', 'si')   === '1.00')
    assert(filesize(kb).to('B', 'si')   === '1024.00')
    assert(filesize(mb).to('KB', 'si')  === '1048.58')
    assert(filesize(gb).to('MB', 'si')  === '1073.74')
    assert(filesize(tb).to('GB', 'si')  === '1099.51')
  })
})