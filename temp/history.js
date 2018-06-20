// ((lambda (x) x) "Lisp")
// [['lambda',['x'],'x'],'lisp']
// [[{ type: 'identifier', value: 'lambda' }, [{ type: 'identifier', value: 'x' }],
//   { type: 'identifier', value: 'x' }],
//  { type: 'literal', value: 'Lisp' }]

// (lambda (x) (* x x)) = (x => x*x) --> function definition
// ((lambda (x) (* x x)) 3) = (x => x*x)(3) = 9

let lambda = function (str) {
  if (str.charAt(0) !== '(') {
    console.error('Invalid input')
    return
  }
  str = str.slice(1)
  str = removeWhiteSpaces(str)
  if (!/^lambda/.test(str)) {
    console.error('Invalid input')
    return
  }
  str = str.slice(6)
  str = removeWhiteSpaces(str)
  if (str.charAt(0) !== '(') {
    console.error('Invalid input')
    return
  }
  str = str.slice(1)
  str = removeWhiteSpaces(str)
  let argsToLambda = []
  while (str.charAt(0) !== ')') {
    let temp = str.match(/^[a-zA-Z]+/)
    if (temp) {
      argsToLambda.push(temp[0])
      str = str.slice(temp[0].length)
      str = removeWhiteSpaces(str)
    } else {
      console.error('Invalid input')
      return
    }
  }
  str = str.slice(1)
  str = removeWhiteSpaces(str)

  // -------- Temperory --------
  str = str.slice(1) // assuming no nested expressions
  str = removeWhiteSpaces(str)
  let operator = str.match(/^\S+/)
  str = str.slice(operator.length)
  str = removeWhiteSpaces(str)
  
  while (str.charAt(0 !== ')')) {

  }
  // ---------------------------
}
