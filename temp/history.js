'use strict'

function lispParser (str) {
  let temp = str.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(' ').filter(e => e !== '')
  return parse(temp)
}

// Incomplete... lots of bugs
function parse (str) {
  console.log(`Inside parse..str = ${str}`)
  let firstChar = str.shift()
  if (firstChar === '(') {
    let operator = str.shift()
    if (!/[+\-*/]/.test(operator)) {
      console.error(`${operator} is illegal, only +,-,*,/ operators are valid`)
      return
    }
    let params = []
    while (str[0] !== ')') {
      params.push(parse(str))
    }
    str.shift()
    return computeValue(operator, params)
  } else if (firstChar === ')') {
    console.error('Invalid Input')
  } else {
    return isNaN(Number(firstChar)) ? firstChar : Number(firstChar)
  }
}

function computeValue (operation, arr) {
  console.log(`Inside compute..operation=${operation}, arr=${arr}`)
  let funcDef = {
    '+': (x, y) => Number(x) + Number(y),
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
  }
  return arr.reduce(funcDef[operation])
}
