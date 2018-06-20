const lib = {
  '+': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '+', 2)) return null
    return arr.reduce((a, b) => a + b)
  },
  '-': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '-', 2)) return null
    return arr.reduce((a, b) => a - b)
  },
  '*': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '*', 2)) return null
    return arr.reduce((a, b) => a * b)
  },
  '/': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '/', 2)) return null
    return arr.reduce((a, b) => a / b)
  },
  '>': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '>', 2)) return null
    let o
    arr.reduce((a, b) => {
      o = Number(a) > Number(b) ? true : false
      return Number(b)
    })
    return o
  },
  '>=': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '>=', 2)) return null
    let o
    arr.reduce((a, b) => {
      o = Number(a) >= Number(b) ? true : false
      return Number(b)
    })
    return o
  },
  '<': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '<', 2)) return null
    let o
    arr.reduce((a, b) => {
      o = Number(a) < Number(b) ? true : false
      return Number(b)
    })
    return o
  },
  '<=': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, '<=', 2)) return null
    let o
    arr.reduce((a, b) => {
      o = Number(a) <= Number(b) ? true : false
      return Number(b)
    })
    return o
  },
  'equal?': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenExact(arr, 'equal?', 2)) return null
    return arr[0] === arr[1] ? true : false
  },
  '=': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenExact(arr, '=', 2)) return null
    return arr[0] === arr[1] ? true : false
  },
  'min': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, 'min', 1)) return null
    return Math.min(...arr)
  },
  'max': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenAtLeast(arr, 'max', 1)) return null
    return Math.max(...arr)
  },
  'even?': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenExact(arr, 'even?', 1)) return null
    return !(arr[0] % 2) ? true : false
  },
  'odd?': (arr) => {
    if (!checks.nullCheck(arr) || !checks.lenExact(arr, 'odd?', 1)) return null
    return (arr[0] % 2) ? true : false
  }
}

const checks = {
  nullCheck: function (arr) {
    if (arr.includes(null)) return false
    return true
  },
  lenExact: function (arr, funcName, length) {
    if (arr.length !== length) {
      console.error(`${funcName} function expects ${length} argument(s), got ${arr.length}`)
      return false
    }
    return true
  },
  lenAtLeast: function (arr, funcName, minLenth) {
    if (arr.length < minLenth) {
      console.error(`${funcName} function expects at least ${minLenth} argument(s), got ${arr.length}`)
      return false
    }
    return true
  }
}
