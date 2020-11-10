import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  calculatorButtons = [
    {value: 'AC', className: 'gray'},
    {value: '+/-', className: 'gray'},
    {value: '%', className: 'gray', disabled: true},
    {value: '/', className: 'yellow', disabled: true},
    {value: 7},
    {value: 8},
    {value: 9},
    {value: '*', className: 'yellow', disabled: true},
    {value: 4},
    {value: 5},
    {value: 6},
    {value: '-', className: 'yellow'},
    {value: 1},
    {value: 2},
    {value: 3},
    {value: '+', className: 'yellow'},
    {value: 0, className: 'double'},
    {value: ',', disabled: true},
    {value: '=', className: 'yellow'},
  ];

  inputValue = '0';

  result = 0;

  store = [];

  logMessage = '';

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.keyCode >= 48 && 57 >= event.keyCode)) {
      this.clickHandler(parseInt(event.key, 10));
    }
    else if (['+', '-', '='].includes(event.key)) {
      this.clickHandler(event.key);
    }
  }

  clickHandler(buttonValue: (string|number)): void {
    if (typeof buttonValue === 'number') {
      let stringNumber = '' + this.result;

      stringNumber += buttonValue;
      this.result = parseInt(stringNumber, 10);
    }
    else {
      switch (buttonValue) {
        case '=': this.equalButtonHandler(); break;
        case '+/-': this.changeNegativeAndPositiveButtonHandler(); break;
        case 'AC': this.clearButtonHandler(); break;
        default: this.operatorButtonHandler(buttonValue);
      }
    }

    this.inputValue = this.result.toString();
  }

  private getResult(): number {
    let result = 0;
    let isPlus = true;

    this.store.forEach(v => {
      if (v === '-' || v === '+') {
        isPlus = v === '+';
      }
      else {
        result = isPlus ? (result + parseInt(v, 10)) : (result - parseInt(v, 10));
      }
    });

    return result;
  }

  private changeNegativeAndPositiveButtonHandler(): void {
    this.result = -1 * this.result;
    this.inputValue = this.result.toString();

    this.showLog();
  }

  private clearButtonHandler(): void {
    this.inputValue = '0';
    this.result = 0;
  }

  private equalButtonHandler(): void {
    if (this.result !== 0) {
      this.store.push(this.result);
      this.result = 0;
    }

    this.result = this.getResult();
    this.showLog(' = ' + this.result);
    this.store = [this.result];
  }

  private operatorButtonHandler(button): void {
    const storeLength = this.store.length;

    if ((storeLength > 0 && typeof this.store[storeLength - 1] === 'string') || storeLength === 0) {
      this.store.push(this.result);
    }

    this.store.push(button);
    this.result = 0;

    this.showLog();
  }

  private showLog(extra: string = ''): void {
    this.logMessage = this.store.join(' ') + extra;
  }
}
