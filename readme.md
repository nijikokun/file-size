# File-size.js

![filesize](http://puu.sh/5JspS.png)

File-size module for node.js for converting, manipulating, and handling file-sizes.


## Features

- Zero Dependencies.
- Supports IEC (power `1024`, _default_), SI (power `1000`), and JEDEC (Alternative SI Unit Notation).
- Conversion from `bytes` to `K`, `M`, `G`, and so forth...
- Customizable human-readable output.

## Installation

```bash
$ npm install file-size
```

Now require it in your files like so:

```javascript
var filesize = require('file-size');
```

## Usage

```javascript
filesize(Number bytes, Object options)
```

Using filesize is very easy, a lot easier if you know the [Specification Table](http://en.wikipedia.org/wiki/Template:Quantities_of_bytes). However,
it's not required to know it, and in most cases you won't need it.


**Initialization**

Filesize works in a jQuery chainable manner so you can use multiple instances without trouble.

```javascript
var size = filesize(186457865);
```

**Options**

```javascript
var size = filesize(186457865, {
  fixed: 2,
  spacer: ' '
});
```

- `fixed` - Number of positions after the decimal to show, default is `2`
- `spacer` - Space between the number and the unit, default is a space ` `

### size.human(String spec) -> String

Generates human readable filesize.

- `spec` can be one of the following:
  - `si`
  - `iec`
  - `jedec`

##### IEC Specification

*Default*

Power of `1024`

```javascript
// outputs: 177.82 MiB
filesize(186457865).human();
```

##### SI Specification

Power of `1000`

```javascript
// outputs: 186.46 MB
filesize(186457865).human('si');
```

##### JEDEC Specification

Changes IEC default unit notation `iB` to `B` for the following: `KB`, `MB`, `GB`

The rest are in `iB` notation, as per JEDEC Specification.

```javascript
// outputs: 186.46 MB
filesize(186457865).human('jedec');
```

### size.to(String unit, String spec) -> String

Converts `bytes` to another filesize `unit`

- `unit` of size can be one of the following:
  - `B`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`
- `spec` can be one of the following:
  - `si`
  - `iec`
  - `jedec`

##### IEC Specification

*Default*

```javascript
// outputs: 177.82
filesize(186457865).to('MB');
```

##### SI Specification

```javascript
// outputs: 186.46
filesize(186457865).to('MB', true);
```

### size.calculate(String spec) -> Object

Calculates suffix, magnitude, fixed, non-fixed, bits (fixed, non-fixed) from specified bytes against the specified `spec`.

- `spec` can be one of the following:
  - `si`
  - `iec`
  - `jedec`

```js
/*
 * outputs:
 *
 *    {
 *      suffix: 'Bytes',
 *      magnitude: 0,
 *      result: 8,
 *      fixed: '8.00',
 *      bits: { result: 1, fixed: '1.00' }
 *    }
*/

var result = filesize(8).calculate()
```