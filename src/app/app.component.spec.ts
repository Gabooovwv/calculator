import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Calculator test', () => {
  it(`Addition`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    const add = a + b;

    app.clickHandler(a);
    app.clickHandler('+');
    app.clickHandler(b);
    app.clickHandler('=');
    expect(app.store[0]).toEqual(add);
    expect(app.logMessage).toEqual(a + ' + ' + b + ' = ' + add);
  });

  it(`Subtraction`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    const sub = a - b;

    app.clickHandler(a);
    app.clickHandler('-');
    app.clickHandler(b);
    app.clickHandler('=');
    expect(app.store[0]).toEqual(sub);
    expect(app.logMessage).toEqual(a +' - ' + b + ' = ' + sub);
  });

  it(`Negative value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const a = Math.floor(Math.random() * 100);
    const result = -1 * a;

    app.clickHandler(a);
    app.clickHandler('+/-');
    expect(app.inputValue).toEqual(result.toString());
  });

  it(`Clear`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const a = Math.floor(Math.random() * 100);

    app.clickHandler(a);
    app.clickHandler('AC');
    expect(app.inputValue).toEqual('0');
  });
});
