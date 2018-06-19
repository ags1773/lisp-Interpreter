document.querySelector('#btn1').addEventListener('click', function () {
  console.log(parse(document.querySelector('#ta1').value))
})
document.querySelector('#btn2').addEventListener('click', function () {  
  console.clear()
})
document.querySelector('#btn3').addEventListener('click', function () {  
  console.clear()
  document.querySelector('#ta1').value = ''
})
