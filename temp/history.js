'use strict'

// (if (= 1 2) (define r 10) (define r 15))    ==> to parse
// ['if', ['=', 1, 2], ['define', 'r', 10], ['define', 'r', 15]]   ==> parser output

const re = {
  atom: /^[^\s\()]*/,
  num: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/

  // str: /^"([^\\"]|\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[\dA-Fa-f]{4})*"$/
}

function parse (str) {
  console.log(`str =>${str}`)
  str = removeWhiteSpaces(str)

  let matchedAtom = str.match(re.atom)[0]
  if (matchedAtom) {
    str = str.slice(matchedAtom.length)
    return matchedAtom
  } 
  // if (re.atom.test(str)) {
  //   console.log(`atom`)
  //   if (re.singleNum.test(str)) return Number(str)
  //   return str
  // }
  if (((str || '').match(/\(/g) || []).length === ((str || '').match(/\)/g) || []).length) {
    let output = []
    if (str.charAt(0) === '(') {
      str = str.slice(1)
      str = removeWhiteSpaces(str)
      let operator = str.match(/^\S+/)
      if (operator) {
        if (operator[0] === 'lambda') {
          return lambdaParser(str)
        }
        // // add logic to check both global and local scope
        if (!lib.hasOwnProperty(operator[0])) console.error(`${operator[0]} function not found in library`)
        str = str.slice(operator.length)

        while (str.charAt(0) !== ')') {
          str = removeWhiteSpaces(str)
          if (str.charAt(0) === '(') {
            output.push(parse(str))
          }

        }
      }
    } else {
      console.error('Invalid Input')
    }
  } else {
    console.error('Unmatched parentheses')
  }
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
