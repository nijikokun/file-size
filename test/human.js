var assert = require('assert')
var filesize = require('../')

var b = 1
var kb = 1024
var mb = 1048576
var gb = 1073741824
var tb = 1099511627776

describe('human()', function () {
  it('should fallback to zero when no number is passed', function () {
    assert(filesize().human() === '0.00 Bytes')
  })

  it('should correctly respect fixed option', function () {
    assert(filesize(2, {
      fixed: 1
    }).human() === '2.0 Bytes')
  })

  it('should correctly respect spacing option', function () {
    assert(filesize(2, {
      spacer: "-"
    }).human() === '2.00-Bytes')
  })

  it('should correctly format multiple bytes', function () {
    assert(filesize(2).human() === '2.00 Bytes')
  })

  it('should correctly format to IEC (power of 1024, default)', function () {
    assert(filesize( b).human() === '1.00 Byte')
    assert(filesize(kb).human() === '1.00 KiB')
    assert(filesize(mb).human() === '1.00 MiB')
    assert(filesize(gb).human() === '1.00 GiB')
    assert(filesize(tb).human() === '1.00 TiB')
  })

  it('should correctly format to SI (power of 1000)', function () {
    var option = 'si'

    assert(filesize( b).human(option) === '1.00 Byte')
    assert(filesize(kb).human(option) === '1.02 kB')
    assert(filesize(mb).human(option) === '1.05 MB')
    assert(filesize(gb).human(option) === '1.07 GB')
    assert(filesize(tb).human(option) === '1.10 TB')
  })

  it('should correctly format to JEDEC', function () {
    var option = 'jedec'

    assert(filesize( b).human(option) === '1.00 Byte')
    assert(filesize(kb).human(option) === '1.00 KB')
    assert(filesize(mb).human(option) === '1.00 MB')
    assert(filesize(gb).human(option) === '1.00 GB')
    assert(filesize(tb).human(option) === '1.00 TiB')
  })
})