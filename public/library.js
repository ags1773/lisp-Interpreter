const lib = {
  '+': (arr) => arr.reduce((a, b) => Number(a) + Number(b)),
  '-': (arr) => arr.reduce((a, b) => Number(a) - Number(b)),
  '*': (arr) => arr.reduce((a, b) => Number(a) * Number(b)),
  '/': (arr) => arr.reduce((a, b) => Number(a) / Number(b)),
  '>': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) > Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '>=': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) >= Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '<': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) < Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  '<=': (arr) => {
    let o
    arr.reduce((a, b) => {
      o = Number(a) <= Number(b) ? '#t' : '#f'
      return Number(b)
    })
    return o || null
  },
  'equal?': (arr) => {
    if (arr.length !== 2) {
      console.error(`equal? expects 2 arguments, got ${arr.length}`)
      return null
    }
    return arr[0] === arr[1] ? '#t' : '#f'
  },
  '=': (arr) => {
    if (arr.length !== 2) {
      console.error(`= expects 2 arguments, got ${arr.length}`)
      return null
    }
    return arr[0] === arr[1] ? '#t' : '#f'
  },
  'min': (arr) => Math.min(...arr),
  'max': (arr) => Math.max(...arr),
  'even?': (arr) => {
    if (arr.length !== 1) {
      console.error(`even? expects 1 argument, got ${arr.length}`)
      return null
    }
    return !(arr[0] % 2) ? '#t' : '#f'
  }
}
