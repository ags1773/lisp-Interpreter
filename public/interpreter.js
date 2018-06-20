var special = {
  // lambda definition will come here
  if: function (input, context) {
    return interpret(input[1], context)
      ? interpret(input[2], context)
      : interpret(input[3], context)
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
}

let interpret = function (input, context) {
  if (context === undefined) {
    return interpret(input, new Context(lib))
  } else if (input instanceof Array) {
    return interpretList(input, context)
  } else if (input && input.type === 'identifier') {
    return context.get(input.value)
  } else {
    if (input) {
      return input.value
    } else {
      console.error('Invalid input')
      return null
    }
  }
}

var interpretList = function (input, context) {
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
