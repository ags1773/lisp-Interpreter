'use strict'

const re = {
  atom: /^(-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?)|([a-zA-Z]+)*/,
  num: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,
  symbol: /^[a-zA-Z]+$/
}

function parse (str) {
  let br1 = str.match(/\(/g)
  let br2 = str.match(/\)/g)
  if (br1 && br2) {
    if (br1.length !== br2.length) { // preliminary check for unmatched brackets
      console.error('Unmatched parentheses')
      return null
    }
  }
  return parsers.parse(str)
}

const parsers = {
  parse: function (str) {
    str = str.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
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
        return this.parse(str)
      }

      let operator = str.match(/^\S+/)
      if (!operator) {
        console.error('Invalid input')
        return null
      }
      if (operator[0] === 'lambda') return this.lambdaParser(str)

      if (!lib.hasOwnProperty(operator[0])) {
        console.error(`${operator[0]} function not found in library`)
        return null
      }

      let output = []
      output.push(operator[0])
      str = str.slice(operator[0].length)
      str = removeWhiteSpaces(str)

      while (str.charAt(0) !== ')') {
        if (str.charAt(0) === '(') {
          output.push(this.parse(str))
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
      return output.includes(null) ? null : output
    } else console.error('Invalid Input')
  },

  lambdaParser: function (str) {
    let output = ['lambda']
    str = str.slice(6)
    str = removeWhiteSpaces(str)
    if (str.charAt(0) !== '(') {
      console.error('Invalid lambda expression')
      return
    }
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    while (str.charAt(0) !== ')') {
      let argument = str.match(re.symbol)
      if (argument) {
        output.push(argument[0])
        str = str.slice(argument.length)
        str = removeWhiteSpaces(str)
      }
      // else {
      //   console.error('Invalid argument to lambda')
      //   return
      // }
    }
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    output.push(this.parse(str))
    return output
  }
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}

// (lambda (x) (+ x x))
