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
  'list': (arr) => '('.concat(arr.join(' ')).concat(')'),
  'quote': (exp) => exp
}

// parse('(+ 2 03)') will return null because of numberParser logic. This is okay
function parse (str) {
  return parsers.expressionParser(str) || parsers.numberParser(str) || parsers.stringParser(str)
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
    str = removeWhiteSpaces(str)
    if (str.charAt(0) === '(') {
      let output = []
      let operator
      str = str.slice(1)
      str = removeWhiteSpaces(str)
      let quoteParserOutput = parsers.quoteParser(str)
      console.log(`quoteParserOutput =${quoteParserOutput}`)

      if (!quoteParserOutput) {
        console.log(`Parsing expression, str =>${str}`)
        operator = str.match(/^[^\s]*/)[0]
        str = str.slice(operator.length)
        str = removeWhiteSpaces(str)

        while (str.charAt(0) !== ')') {
          let temp = parse(str)
          if (!temp) return null
          output.push(temp[0])
          str = removeWhiteSpaces(temp[1])
        }
      } else {
        output.push(quoteParserOutput[0])
        str = removeWhiteSpaces(quoteParserOutput[1])
        operator = 'quote'
        return [computeValue(operator, output), str]
      }

      if (str.charAt(0) === ')') {
        str = str.slice(1)
        str = removeWhiteSpaces(str)
        if (env.hasOwnProperty(operator)) return [computeValue(operator, output), str]
        console.error(`${operator} operation is undefined`)
        return
        // keep this return
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
  quoteParser: function (str) {
    str = removeWhiteSpaces(str)
    console.log(`Quote parser, str=${str}`)
    let reTest1 = str.match(/^'\s*\([^)]*\)/)
    let reTest2 = str.match(/^quote\s*\([^)]*\)/)
    if (reTest1) reTest1 = reTest1[0]
    if (reTest2) reTest2 = reTest2[0]
    if (!(reTest1 || reTest2)) { console.log('Quote parser returning null!'); return null }
    return reTest1
      ? [removeWhiteSpaces(reTest1.slice(1)), str.slice(reTest1.length)]
      : [removeWhiteSpaces(reTest2.slice(5)), str.slice(reTest2.length)]
    //
    // let reTest1 = /^'\s*\([^)]*\)/.exec(str)
    // let reTest2 = /^quote\s*\([^)]*\)/.exec(str)
    // if (!(reTest1 || reTest2)) { console.log('Quote parser returning null!'); return null }
    // return reTest1
    //   ? [removeWhiteSpaces(reTest1[0].slice(1)), str.slice(reTest1[0].length)]
    //   : [removeWhiteSpaces(reTest2[0].slice(5)), str.slice(reTest2[0].length)]
  }
}