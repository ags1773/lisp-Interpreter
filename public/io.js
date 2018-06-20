document.querySelector('#btn1').addEventListener('click', function () {
  let k = parse(document.querySelector('#ta1').value)
  if (k) k = k[0]
  console.log('---------------------------')
  console.log('Parser output =>')
  console.log(k)
  console.log('Interpreter output =>')
  console.log(interpret(k))
  console.log('---------------------------')
})
document.querySelector('#btn2').addEventListener('click', function () {  
  console.clear()
})
document.querySelector('#btn3').addEventListener('click', function () {  
  console.clear()
  document.querySelector('#ta1').value = ''
})
