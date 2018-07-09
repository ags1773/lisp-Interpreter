'use strict'

const re = {
  atom: /^(-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?)|"([^\\"]|\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[\dA-Fa-f]{4})*"|[a-zA-Z]+/,
  num: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  symbol: /^[a-zA-Z]+$/,
  str: /^"([^\\"]|\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[\dA-Fa-f]{4})*"/
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
      let temp = []
      temp.push({type: 'number', value: Number(str.match(re.num)[0])})
      str = str.slice(str.match(re.num)[0].length)
      str = removeWhiteSpaces(str)
      temp.push(str)
      return temp
    } else if (re.symbol.test(str)) {
      let temp = []
      temp.push({type: 'identifier', value: str})
      str = str.slice(str.length)
      str = removeWhiteSpaces(str)
      temp.push(str)
      return temp
    } else if (str.charAt(0) === '(') {
      str = str.slice(1)
      str = removeWhiteSpaces(str)

      if (/^\(\s*lambda/.test(str)) {
        let lambdaParserOutput = this.lambdaParser(str)
        if (lambdaParserOutput) {
          str = lambdaParserOutput[1]
          let valuesToLambdaArgs = this.parse(str)

          if (valuesToLambdaArgs) { // lambda function is to execute immediately
            str = valuesToLambdaArgs[1]
            return [[lambdaParserOutput[0], valuesToLambdaArgs[0]], str]
          } else { // lambda is with define, and will not execute immediately
            return [lambdaParserOutput[0], str]
          }
        } else return null
      }

      if (str.charAt(0) === ')') { // () returns (); () 10 returns 10
        str = str.slice(1)
        str = removeWhiteSpaces(str)
        if (str.length === 0) return '()'
        let temp = this.parse(str)
        str = temp[1]
        return temp[0]
      }

      let operator = str.match(/^\S+/)
      if (!operator) {
        console.error('Invalid input')
        return null
      }

      // // commented out to parse recursive lambda functios like: (define fact (lambda (n) (if (<= n 1) 1 (* n (fact (- n 1))))))
      // if (!lib.hasOwnProperty(operator[0]) && !special.hasOwnProperty(operator[0])) {
      //   console.error(`${operator[0]} function not found in library`)
      //   return null
      // }

      let output = []
      output.push({type: 'identifier', value: operator[0]})
      str = str.slice(operator[0].length)
      str = removeWhiteSpaces(str)

      while (str.charAt(0) !== ')') {
        if (/^\(\s*lambda/.test(str)) {
          let lambdaParserOutput = this.lambdaParser(str)
          if (lambdaParserOutput) {
            str = lambdaParserOutput[1]
            let valuesToLambdaArgs = this.parse(str)
            if (valuesToLambdaArgs) { // lambda function is to execute immediately
              output.push([lambdaParserOutput[0], valuesToLambdaArgs[0]])
              str = valuesToLambdaArgs[1]
            } else { // lambda is with define, and will not execute immediately
              output.push(lambdaParserOutput[0])
            }
          } else return null
        }

        if (str.charAt(0) === '(') {
          let temp = this.parse(str)
          if (temp) {
            output.push(temp[0])
            str = temp[1]
            continue // needed for 'if'. If not present, the '(' after 'if' is considered as operator, which is wrong
          } else return null
        }
        let atom = str.match(re.atom)
        if (atom) {
          if (re.num.test(atom[0])) {
            output.push({type: 'number', value: Number(atom[0])})
          } else if (re.str.test(atom[0])) {
            output.push({type: 'string', value: atom[0].slice(1, -1)})
          } else output.push({type: 'identifier', value: atom[0]})
          str = str.slice(atom[0].length)
          str = removeWhiteSpaces(str)
        }
        if (str.length === 0) {
          console.error('Unmatched parentheses')
          return null
        }
      }
      str = str.slice(1)
      str = removeWhiteSpaces(str)

      // if (str.length !== 0) return this.parse(str) // (+ 2 3) (+ 4 5) => will parse (+ 4 5) and discard (+ 2 3)
      return output.includes(null) ? null : [output, str]
    } else {
      // console.error('Invalid Input')
      return null
    }
  },

  lambdaParser: function (str) {
    let finalOutput = []
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    str = str.slice(6)
    str = removeWhiteSpaces(str)
    let output = []
    output.push({ type: 'identifier', value: 'lambda' })

    if (str.charAt(0) !== '(') {
      console.error('Invalid lambda expression')
      return null
    }
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    let lambdaArguments = []
    while (str.charAt(0) !== ')') {
      let argument = str.match(/^[a-zA-Z]+/)
      if (argument) {
        lambdaArguments.push({ type: 'identifier', value: argument[0] })
        str = str.slice(argument[0].length)
        str = removeWhiteSpaces(str)
      }
    }
    output.push(lambdaArguments)
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    let temp = this.parse(str)
    output.push(temp[0])
    finalOutput.push(output)
    str = temp[1]
    str = removeWhiteSpaces(str)
    str = str.slice(1)
    str = removeWhiteSpaces(str)
    return [output, str]
  }
}

function removeWhiteSpaces (data) {
  let reTest = /^\s+/.exec(data)
  if (!reTest) return data
  return data.slice(reTest[0].length)
}
