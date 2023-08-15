class Calculator {
  constructor(screenText) {
    this.screenText = screenText;
    this.clear();
  }

  clear() {
    this.screen = "";
  }

  delete() {
    this.screen = this.screen.replaceAll(",", "");
    this.screen = this.screen.slice(0, -1);
    this.screen = parseFloat(this.screen).toLocaleString("en-US", {
      maximumFractionDigits: 20,
    });
  }

  appendNumber(number) {
    this.screen += number;
    this.screen = this.screen.replaceAll(",", "");
    this.screen = parseFloat(this.screen).toLocaleString("en-US", {
      maximumFractionDigits: 20,
    });
    if (number == ".") {
      this.screen += ".";
    }
  }

  updateDisplay() {
    this.screenText.innerText = this.screen;
  }
}

const screen = document.querySelector(".calc-screen");

//all numbers
const numberButtons = document.querySelectorAll("[data-number]");

//functions
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset");
//const decimalButton = document.querySelector("[data-decimal]");

//operations
const plusButton = document.querySelector("[data-plus");
const minusButton = document.querySelector("[data-minus]");
const multiplyButton = document.querySelector("[data-multiply]");
const divideButton = document.querySelector("[data-divide]");

const calculator = new Calculator(screen);

//add an event listener
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
