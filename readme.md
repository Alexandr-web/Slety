# Slety

## Description
It's a JavaScript framework inspired by Vue, so you'll find a lot of similarities here.

## What has
- Reactivity

## Example
```js
import Slety from "./Slety";

const sy = new Slety({
  // This is where some states will be stored that will be reactive
  state: {
    num1: 10,
    num2: 10,
    total: 0,
  },
  // Here you can make an observer for state changes
  watchers: {
    // The name of the observer should depend on the name of the state you want to track
    num1(newVal) {
      // When the state of num1 changes, the product of num1 and num2 is written to the total state
      // Also here the context is the state object
      this.total = newVal * this.num2;
    },
    total(newVal, oldVal) {
      // 1000 0
      console.log(newVal, oldVal);
    },
  },
}).init();

// Change state
sy.num1 = 100;
```

## Plans

During the development process, I want to cover topics such as reactivity, virtual DOM, and hooks.