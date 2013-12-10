(function () {
  var filesize = function (bytes, options) {
    bytes = typeof bytes == 'number' ? bytes : 0;

    options = options || {};

    options.fixed = typeof options.fixed == 'number' ? options.fixed : 2;
    options.spacer = typeof options.spacer == 'string' ? options.spacer : ' ';

    var sizable = {
      calculate: function (SI) {
        var algorithm = SI ? 1e3 : 1024;
        var magnitude = Math.log(bytes) / Math.log(algorithm)|0;
        var result = (bytes / Math.pow(algorithm, magnitude));

        return {
          magnitude: magnitude,
          result: result,
          fixed: parseFloat(result.toFixed(options.fixed))
        };
      },

      to: function (unit, si) {
        unit = typeof unit == 'string' ? unit[0].toUpperCase() : 'B';

        var algorithm = si ? 1e3 : 1024;
        var units = 'BKMGTPEZY'.split('');
        var position = units.indexOf(unit);
        var result = bytes;

        if (position == -1 || position == 0) return result;
        for (; position > 0; position--) result /= algorithm;

        return parseFloat(result.toFixed(options.fixed));
      },

      human: function (spec) {
        spec = spec || {};
        
        var algorithm = spec.si ? ['k', 'B'] : ['K', 'iB'];
        var input = sizable.calculate(spec.si);

        if (--input.magnitude < 2 && !spec.si && spec.jedec)
          algorithm[1] = 'B';

        return input.fixed + options.spacer + (input.magnitude ? (algorithm[0] + 'MGTPEZY')[input.magnitude] + algorithm[1] : 'Bytes');
      }
    };

    return sizable;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = filesize;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return filesize;
      });
    } else {
      window.filesize = filesize;
    }
  }
})();