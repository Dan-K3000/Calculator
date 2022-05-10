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
  numberHolder = 0;
  displayValue = '';
  operator = '';
});

const buttons = document.querySelectorAll("button");
const output = document.querySelector('.answer');
let displayValue = '';
let numberHolder = 0;
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    if((/[0-9|.]/).test(e.target.textContent)) {
      if(e.target.textContent == '.' && displayValue.includes(".")){
        return;
      }
      displayValue += e.target.textContent
    }
    else if((/[/|*|\-|+]/).test(e.target.textContent)) {
      if(operator == '/' && displayValue == "0"){
        output.textContent = "You have doomed us all!";
        numberHolder = 0;
        operator = '';
        displayValue = '';
        return;
      }
      else if(displayValue == '' && numberHolder == 0 || operator == e.target.textContent && displayValue == '') {
        return;
      }
      else if(displayValue == ''){
        operator = e.target.textContent
        output.textContent = `${numberHolder} ${operator}`
        return;
      }
      else if(numberHolder == 0){
        numberHolder = parseFloat(displayValue)
      } else  {
        numberHolder = operate(numberHolder, parseFloat(displayValue), operator)
      }
      operator = e.target.textContent
      displayValue = '';
    }

    else if((/[=]/).test(e.target.textContent)) {
      if(numberHolder == 0)return;
      displayValue = operate(numberHolder, parseFloat(displayValue), operator);
      numberHolder = 0;
      operator = '';
    }

    if (!(/[/|*|\-|+]/).test(operator)) {
      output.textContent = displayValue;
    } else {
      output.textContent = `${numberHolder} ${operator} ${displayValue}`
    }
  })
});
