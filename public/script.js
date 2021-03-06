'use strict'

// parsers.findInEnv() should come first
function parse (str) {
  return parsers.findInEnv(str) || parsers.expressionParser(str) || parsers.numberParser(str) ||
  parsers.stringParser(str) || parsers.symbolParser(str)
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
  symbolParser: function (str) {
    let reTest = /^[a-zA-Z]+/.exec(str)
    if (!reTest) return null
    return [reTest[0], str.slice(reTest[0].length)]
  },
  numberParser: function (str) {
    let reTest = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(str)
    if (/^-?0+[1-9]+/.test(str) || !reTest) return null
    return [Number(reTest[0]), str.slice(reTest[0].length)]
  },
  findInEnv: function (str) {
    str = removeWhiteSpaces(str)
    let key = str.match(/^[^\s)]*/)
    if (key) {
      if (env.hasOwnProperty(key[0])) {
        str = str.slice(key.length)
        str = removeWhiteSpaces(str)
        return [env[key[0]], removeWhiteSpaces(str)]
      }
    }
  }
}
