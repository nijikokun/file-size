// File-Size | 1.0.0 | MIT | Nijiko Yonskai <nijikokun@gmail.com> | 2015
(function (plugin) {
  /* istanbul ignore next: differing implementations */
  if (typeof module !== 'undefined' && module.exports) return module.exports = plugin()
  else if (typeof define === 'function' && define.amd) return define([], plugin)
  else this.filesize = plugin()
})(function () {
  var units = 'BKMGTPEZY'.split('')
  function equals (a, b) { return a && a.toLowerCase() === b.toLowerCase() }

  return function filesize (bytes, options) {
    bytes = typeof bytes == 'number' ? bytes : 0
    options = options || {}
    options.fixed = typeof options.fixed == 'number' ? options.fixed : 2
    options.spacer = typeof options.spacer == 'string' ? options.spacer : ' '

    options.calculate = function (spec) {
      var type = equals(spec, 'si') ? ['k', 'B'] : ['K', 'iB']
      var algorithm = equals(spec, 'si') ? 1e3 : 1024
      var magnitude = Math.log(bytes) / Math.log(algorithm)|0
      var result = (bytes / Math.pow(algorithm, magnitude))
      var fixed = result.toFixed(options.fixed)
      var suffix

      if (magnitude-1 < 3 && !equals(spec, 'si') && equals(spec, 'jedec'))
        type[1] = 'B'

      suffix = magnitude
        ? (type[0] + 'MGTPEZY')[magnitude-1] + type[1]
        : ((fixed|0) === 1 ? 'Byte' : 'Bytes')

      return {
        suffix: suffix,
        magnitude: magnitude,
        result: result,
        fixed: fixed,
        bits: { result: result/8, fixed: (result/8).toFixed(options.fixed) }
      }
    }

    options.to = function (unit, spec) {
      var algorithm = equals(spec, 'si') ? 1e3 : 1024
      var position = units.indexOf(typeof unit == 'string' ? unit[0].toUpperCase() : 'B')
      var result = bytes

      if (position === -1 || position === 0) return result.toFixed(2)
      for (; position > 0; position--) result /= algorithm
      return result.toFixed(2)
    }

    options.human = function (spec) {
      var output = options.calculate(spec)
      return output.fixed + options.spacer + output.suffix
    }

    return options;
  }
})
