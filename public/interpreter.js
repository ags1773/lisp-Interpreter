const special = {
  lambda: function (input, context) {
    return function () {
      let lambdaArguments = arguments
      let lambdaScope = input[1].reduce(function (acc, x, i) {
        acc[x.value] = lambdaArguments[i]
        return acc
      }, {})

      return interpret(input[2], new Context(lambdaScope, context))
    }
  },
  if: function (input, context) {
    return interpret(input[1], context)
      ? interpret(input[2], context)
      : interpret(input[3], context)
  },
  define: function (input, context) {
    // let key = interpret(input[1], context)
    let key = context.get(input[1])
    let value = interpret(input[2], context)
    // context.scope[key] = value
    context.set(key, value)
  }
}

let Context = function (scope, parent) {
  this.scope = scope
  this.parent = parent

  this.get = function (identifier) {
    if (identifier in this.scope) {
      return this.scope[identifier]
    } else if (parent !== undefined) {
      return this.parent.get(identifier)
    }
  }

  this.set = function (identifier, value) {
    this.scope[identifier] = value
  }
  // this.find = function (identifier)
}

let interpret = function (input, context) {
  if (context === undefined) {
    return interpret(input, new Context(lib))
  } else if (input instanceof Array) {
    return interpretList(input, context)
  } else if (input && input.type === 'identifier') {
    return context.get(input.value)
  }
  // else if (input && input.value in context.scope) {
  //   return context.scope[input.value]
  // } 
  else {
    if (input) {
      return input.value
    } else {
      console.error('Invalid input')
      return null
    }
  }
}

let interpretList = function (input, context) {
  if (input.length > 0 && input[0].value in special) {
    return special[input[0].value](input, context)
  } else {
    let list = input.map(x => interpret(x, context))
    if (list[0] instanceof Function) {
      return list[0].apply(undefined, [list.slice(1)])
    } else {
      return list
    }
  }
}
