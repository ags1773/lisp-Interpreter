'use strict'

// (if (= 1 2) (define r 10) (define r 15))    ==> to parse
// ['if', ['=', 1, 2], ['define', 'r', 10], ['define', 'r', 15]]   ==> parser output

const re = {
  // atom: /^[^\s\()]*/,
  num: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/
}

function parse (str) {
  console.log(`str =>${str}`)
  str = removeWhiteSpaces(str)

  if (re.num.test(str)) {
    console.log('It\'s a num')
    return Number(str)
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
    if (operator[0] === 'lambda') return lambdaParser(str)

    if (!lib.hasOwnProperty(operator[0])) {
      console.error(`${operator[0]} function not found in library`)
      return
    }

    let output = []
    output.push(operator)
    str = str.slice(operator.length)
    str = removeWhiteSpaces(str)

  } else console.error('Invalid Input')
}

function lambdaParser (str) {
  console.log('inside lambda parser')
  return
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}
