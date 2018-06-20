const lib = {
  '+': function (arr) {
    let acc = 0
    for (let i = 0; i < arr.length; i++) {
      acc = acc + arr[i]
    }
    return acc
  },
  '-': function (arr) {
    if (arr.length < 2) return null
    let acc = arr[0]
    for (let i = 1; i < arr.length; i++) {
      acc = acc - arr[i]
    }
    return acc
  },
  '*': function (arr) {
    let acc = 1
    for (let i = 0; i < arr.length; i++) {
      acc = acc * arr[i]
    }
    return acc
  },
  '/': function (arr) {
    if (arr.length < 2) return null
    let acc = arr[0]
    for (let i = 1; i < arr.length; i++) {
      acc = acc / arr[i]
    }
    return acc
  },
  '>': (arr) => {
    if (arr.length < 2) return null
    let result
    for (let i = 1; i < arr.length; i++) {
      result = arr[i - 1] > arr[i] ? true : false
    }
    return result
  },
  // '>=': (arr) => {
  //   let o
  //   arr.reduce((a, b) => {
  //     o = Number(a) >= Number(b) ? '#t' : '#f'
  //     return Number(b)
  //   })
  //   return o || null
  // },
  // '<': (arr) => {
  //   let o
  //   arr.reduce((a, b) => {
  //     o = Number(a) < Number(b) ? '#t' : '#f'
  //     return Number(b)
  //   })
  //   return o || null
  // },
  // '<=': (arr) => {
  //   let o
  //   arr.reduce((a, b) => {
  //     o = Number(a) <= Number(b) ? '#t' : '#f'
  //     return Number(b)
  //   })
  //   return o || null
  // },
  // 'equal?': (arr) => {
  //   if (arr.length !== 2) {
  //     console.error(`equal? expects 2 arguments, got ${arr.length}`)
  //     return null
  //   }
  //   return arr[0] === arr[1] ? '#t' : '#f'
  // },
  // '=': (arr) => {
  //   if (arr.length !== 2) {
  //     console.error(`= expects 2 arguments, got ${arr.length}`)
  //     return null
  //   }
  //   return arr[0] === arr[1] ? '#t' : '#f'
  // },
  // 'min': (arr) => Math.min(...arr),
  // 'max': (arr) => Math.max(...arr),
  // 'even?': (arr) => {
  //   if (arr.length !== 1) {
  //     console.error(`even? expects 1 argument, got ${arr.length}`)
  //     return null
  //   }
  //   return !(arr[0] % 2) ? '#t' : '#f'
  // },
  'define': 4
}
