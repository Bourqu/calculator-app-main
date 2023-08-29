const root = document.documentElement;
root.className = "three";

class Calculator {
  constructor(screenText) {
    this.screenText = screenText;
    this.prior = "";
    this.operator = "";
    this.clear();
  }

  clear() {
    this.screen = "";
  }

  clearMemory() {
    this.prior = "";
    this.operation = "";
  }

  delete() {
    this.screen = this.screen.replaceAll(",", "");
    this.screen = this.screen.slice(0, -1);
    this.screen = parseFloat(this.screen).toLocaleString("en-US", {
      maximumFractionDigits: 20,
    });
  }

  appendNumber(number) {
    const regex = /\d*\.\d*/;

    if (regex.test(this.screen) && number === ".") {
      return;
    }

    //clears the emory and screen if user attmepts to append to a calulated number
    if (this.prior !== "" && this.operator === "") {
      this.clearMemory();
      this.clear();
      this.updateDisplay();
    }

    //if input is just a decimal on a blank screen, add the zero.
    if (this.screen === "" && number == ".") {
      this.screen = "0.";
    }

    //This blocks numbers longer than 12 form beign added to avoid floating point weirdness.
    if (this.screen.length < 12) {
      this.screen += number;
    }

    //prepares the string and converts the string to a Us float style
    this.screen = this.screen.replaceAll(",", "");
    const regexp1 = /\d*\.0$/;
    const regexp2 = /\d*\.0*$/;
    if (regexp1.test(String(this.screen))) {
      //issue is any #0 passes this test
      this.screen = parseFloat(this.screen).toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });
      this.screen += ".0";
    } else if (regexp2.test(String(this.screen))) {
      const leftRight = this.screen.split(".");
      this.screen =
        parseFloat(leftRight[0]).toLocaleString("en-US", {
          maximumFractionDigits: 20,
        }) +
        "." +
        leftRight[1];
    } else {
      this.screen = parseFloat(this.screen).toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });
    }
  }

  updateDisplay() {
    this.screenText.innerText = this.screen;
  }

  multiply() {
    this.prior = String(this.screen);
    this.operator = "*";
  }
  divide() {
    this.prior = String(this.screen);
    this.operator = "/";
  }

  add() {
    this.prior = String(this.screen);
    this.operator = "+";
  }

  subtract() {
    this.prior = String(this.screen);
    this.operator = "-";
  }

  equalError() {
    this.screen = this.prior;
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
  calculator.clearMemory();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

multiplyButton.addEventListener("click", () => {
  calculator.multiply();
  calculator.clear();
});

divideButton.addEventListener("click", () => {
  calculator.divide();
  calculator.clear();
});

plusButton.addEventListener("click", () => {
  calculator.add();
  calculator.clear();
});

minusButton.addEventListener("click", () => {
  calculator.subtract();
  calculator.clear();
});

equalButton.addEventListener("click", () => {
  if (calculator.screen == "") {
    calculator.equalError();
  }
  console.log(calculator.screen);
  switch (calculator.operator) {
    case "*":
      calculator.operator = "";
      calculator.screen =
        parseFloat(calculator.prior.replaceAll(",", "")) *
        parseFloat(calculator.screen.replaceAll(",", ""));
      calculator.screen = calculator.screen.toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });

      calculator.updateDisplay();
      calculator.prior = String(calculator.screen);
      break;
    case "/":
      calculator.operator = "";
      if (calculator.screen == "0") {
        calculator.prior = "";
        calculator.screen = "DIV-BY-ZERO-ERROR";
        calculator.updateDisplay();
        return;
      }
      calculator.screen =
        parseFloat(calculator.prior.replaceAll(",", "")) /
        parseFloat(calculator.screen.replaceAll(",", ""));
      calculator.screen = calculator.screen.toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });
      calculator.updateDisplay();
      calculator.prior = String(calculator.screen);
      break;
    case "+":
      calculator.operator = "";
      calculator.screen =
        parseFloat(calculator.prior.replaceAll(",", "")) +
        parseFloat(calculator.screen.replaceAll(",", ""));
      calculator.screen = calculator.screen.toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });
      calculator.updateDisplay();
      calculator.prior = calculator.screen;
      break;
    case "-":
      calculator.operator = "";
      calculator.screen =
        parseFloat(calculator.prior.replaceAll(",", "")) -
        parseFloat(calculator.screen.replaceAll(",", ""));
      calculator.screen = calculator.screen.toLocaleString("en-US", {
        maximumFractionDigits: 20,
      });
      calculator.updateDisplay();
      calculator.prior = calculator.screen;
      break;
  }
});

//COMMENTS!!!!
//add the mobile compatibility
//add the toggle effect behaviour.
//fix the location
//5) add button noises
