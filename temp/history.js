'use strict'

let env = {
  '+': (x, y) => Number(x) + Number(y),
  '-': (x, y) => Number(x) - Number(y),
  '*': (x, y) => Number(x) * Number(y),
  '/': (x, y) => Number(x) / Number(y),
  'concat': (x, y) => x.concat(y),
  'custom1': (x, y) => x + '__' + y
}
// parse('(+ 2 03)') will return null because of numberParser logic. This is okay
function parse (str) {
  return parsers.expressionParser(str) || parsers.numberParser(str) || parsers.stringParser(str)
}

function computeValue (operation, arr) {
  return arr.reduce(env[operation])
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}

let parsers = {
  expressionParser: function (str) {
    // console.log(`Expression parser, str --> ${str}`)
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

        if (str.charAt(0) === ')') {
          str = str.slice(1)
          str = removeWhiteSpaces(str)
          if (env.hasOwnProperty(operator)) return [computeValue(operator, output), str]
          console.error(`${operator} operation is undefined`)
          return
        }
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
  }
}
