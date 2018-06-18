'use strict'

// (if (= 1 2) (define r 10) (define r 15))    ==> to parse
// ['if', ['=', 1, 2], ['define', 'r', 10], ['define', 'r', 15]]   ==> parser output

const re = {
  atom: /^[^\s)]*/,
  num: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,
  symbol: /^[a-zA-Z]+$/
}

function parse (str) {
  str = str.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
  console.log(`Inside parse, str =>${str}`)
  str = removeWhiteSpaces(str)

  if (re.num.test(str)) {
    return Number(str)
  } else if (re.symbol.test(str)) {
    return str
  } else if (str.charAt(0) === '(') {
    str = str.slice(1)
    str = removeWhiteSpaces(str)

    if (str.charAt(0) === ')') { // () returns (); () 10 returns 10
      str = str.slice(1)
      str = removeWhiteSpaces(str)
      if (str.length === 0) return '()'
      return parse(str)
    }

    let operator = str.match(/^\S+/)
    if (!operator) {
      console.error('Invalid input')
      return null
    }
    if (operator[0] === 'lambda') return lambdaParser(str)

    if (!lib.hasOwnProperty(operator[0])) {
      console.error(`${operator[0]} function not found in library`)
      return null
    }

    let output = []
    output.push(operator[0])
    str = str.slice(operator[0].length)
    str = removeWhiteSpaces(str)

    // while (!str.startsWith(')')) {
    while (str.charAt(0) !== ')') {
      if (str.charAt(0) === '(') {
        output.push(parse(str))
        str = str.slice(str.indexOf(')') + 1)
        str = removeWhiteSpaces(str)
      }
      let atom = str.match(re.atom)
      if (atom[0]) {
        if (re.num.test(atom[0])) {
          output.push(Number(atom[0]))
        } else output.push(atom[0])
        str = str.slice(atom[0].length)
        str = removeWhiteSpaces(str)
      }
      if (str.length === 0) {
        console.error('Unmatched parentheses')
        return null
      }
    }
    str = str.slice(1)
    if (str.length !== 0) {
      console.error('Unmatched parentheses')
      return null
    }
    return output.includes(null) ? null : output
  } else console.error('Invalid Input')
}

function lambdaParser (str) {
  console.log('inside lambda parser')
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}
