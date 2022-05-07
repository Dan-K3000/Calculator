function operate(x, y, operator){
  switch(operator){
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      if(y == 0) return 'You have doomed us all';
      return x / y;
  }
};

const clear = document.querySelector(".clear");

clear.addEventListener('click', () => {
  num1 = 0;
  num2 = 0;
  displayValue = '';
  operator = '';
});

const buttons = document.querySelectorAll("button");
const output = document.querySelector('.answer');
let displayValue = '';
let num1 = 0;
let num2 = 0;
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    if((/[0-9|.]/).test(e.target.textContent)) {
      displayValue += e.target.textContent
    }
    else if((/[/|*|\-|+]/).test(e.target.textContent)) {
      operator = e.target.textContent

      if(num1 == 0){
        num1 = parseFloat(displayValue)
      } else  {
        num1 = operate(num1, parseFloat(displayValue), operator)
      }
      displayValue = '';
    }
    
    else if((/[=]/).test(e.target.textContent)) {
      if(num1 == 0)return;
      displayValue = operate(num1, parseFloat(displayValue), operator);
      num1 = 0;
      operator = '';
    }
    console.log(`${num1} ${operator} ${num2}`)

    if (!(/[/|*|\-|+]/).test(operator)) {
      output.textContent = displayValue;
    } else {
      output.textContent = `${num1} ${operator} ${displayValue}`
    }
  })
});
