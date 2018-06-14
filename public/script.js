'use strict'

const env = {
  '+': (arr) => arr.reduce((a, b) => Number(a) + Number(b)),
  '-': (arr) => arr.reduce((a, b) => Number(a) - Number(b)),
  '*': (arr) => arr.reduce((a, b) => Number(a) * Number(b)),
  '/': (arr) => arr.reduce((a, b) => Number(a) / Number(b)),
  '>': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) > Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '>=': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) >= Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '<': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) < Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '<=': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) <= Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  'equal?': (arr) => {
    if (arr.length !== 2) {
      console.error(`equal? expects 2 arguments, got ${arr.length}`)
      return null
    }
    return arr[0] === arr[1] ? '#t' : '#f'
  },
  '=': (arr) => {
    if (arr.length !== 2) {
      console.error(`= expects 2 arguments, got ${arr.length}`)
      return null
    }
    return arr[0] === arr[1] ? '#t' : '#f'
  },
  'min': (arr) => Math.min(...arr),
  'max': (arr) => Math.max(...arr),
  'even?': (arr) => {
    if (arr.length !== 1) {
      console.error(`even? expects 1 argument, got ${arr.length}`)
      return null
    }
    return !(arr[0] % 2) ? '#t' : '#f'
  },
  'define': (arr) => {
    if (arr.length !== 2) {
      console.error('Invalid define')
      return null
    }
    env[arr[0]] = arr[1]
    return arr[1]
  },
  // 'area': (radius) => Math.PI * radius * radius,
  'list': (arr) => '('.concat(arr.join(' ')).concat(')')
}

// parse('(+ 2 03)') will return null because of numberParser logic. This is okay
function parse (str) {
  return parsers.expressionParser(str) || parsers.numberParser(str) || parsers.stringParser(str) || parsers.findInEnv(str)
}

function computeValue (operation, arr) {
  return env[operation](arr)
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}

let parsers = {
  expressionParser: function (str) {
    // console.log(`Inside expressionPaeser, str =${str}`)
    str = removeWhiteSpaces(str)
    if (str.charAt(0) === '(') {
      let output = []
      str = str.slice(1)
      str = removeWhiteSpaces(str)

      let operator = str.match(/^[^\s]*/)[0]
      str = str.slice(operator.length)
      str = removeWhiteSpaces(str)

      while (str.charAt(0) !== ')') {
        let temp = parse(str)
        if (!temp) return null
        output.push(temp[0])
        str = removeWhiteSpaces(temp[1])
      }

      if (str.charAt(0) === ')') {
        str = str.slice(1)
        str = removeWhiteSpaces(str)
        if (env.hasOwnProperty(operator)) return [computeValue(operator, output), str]
        console.error(`${operator} operation is undefined`)
      }
    } else return null
  },
  stringParser: function (str) {
    let reTest = /^"([^\\"]|\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[\dA-Fa-f]{4})*"/.exec(str)
    if (!reTest) return null
    return [reTest[0].slice(1, -1), str.slice(reTest[0].length)]
  },
  numberParser: function (str) {
    let reTest = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(str)
    if (/^-?0+[1-9]+/.test(str) || !reTest) return null
    return [Number(reTest[0]), str.slice(reTest[0].length)]
  },
  findInEnv: function (str) {
    let key = str.match(/^[^\s)]*/)
    if (key) {
      if (env.hasOwnProperty(key[0])) {
        str = str.slice(key.length)
        str = removeWhiteSpaces(str)
        return env[key[0]]
      }
    }
  }
}
