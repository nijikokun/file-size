var assert = require('assert')
var filesize = require('../')

var b = 1
var kb = 1024
var mb = 1048576
var gb = 1073741824
var tb = 1099511627776

describe('human readable', function () {
  it('should correctly format to IEC (power of 1024, default)', function () {
    filesize( b).human().should.equal('1 Byte')
    filesize(kb).human().should.equal('1 KiB')
    filesize(mb).human().should.equal('1 MiB')
    filesize(gb).human().should.equal('1 GiB')
    filesize(tb).human().should.equal('1 TiB')
  })

  it('should correctly format to SI (power of 1000)', function () {
    var options = { si: true }

    filesize( b).human(options).should.equal('1 Byte')
    filesize(kb).human(options).should.equal('1.02 kB')
    filesize(mb).human(options).should.equal('1.05 MB')
    filesize(gb).human(options).should.equal('1.07 GB')
    filesize(tb).human(options).should.equal('1.1 TB')
  })

  it('should correctly format to JEDEC', function () {
    var options = { jedec: true }

    filesize( b).human(options).should.equal('1 Byte')
    filesize(kb).human(options).should.equal('1 KB')
    filesize(mb).human(options).should.equal('1 MB')
    filesize(gb).human(options).should.equal('1 GB')
    filesize(tb).human(options).should.equal('1 TiB')
  })
})