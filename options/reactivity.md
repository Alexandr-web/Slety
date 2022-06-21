# Reactivity

When you change any property of the `state` object, the setter keeps track of its changes and can pass you its new and old value in the observer.

## Example reactivity

```js
import Slety from "./Slety";

const options = {
  // This is where some states will be stored that will be reactive
  state: {
    num1: 10,
    num2: 10,
    total: 0,
  },
  // Here you can make an observer for state changes
  observe: {
    // The name of the observer should depend on the name of the state you want to track
    num1(newVal) {
      // When the state of num1 changes, the product of num1 and num2 is written to the total state
      // Also the context here is an object containing "actions" and "state"
      this.total = newVal * this.num2;
    },
    total(newVal, oldVal) {
      // 1000 0
      console.log(newVal, oldVal);
    },
  },
};

const sy = new Slety(options).init();

// Change state
sy.num1 = 100;
```

## Counter Example
```js
import Slety from "./Slety";

const countEl = document.querySelector(".count");
const options = {
  state: { count: 0, },
  observe: {
    count(newVal) {
      countEl.innerText = newVal;
    },
  },
  // Here you can write some actions related to states
  actions: {
    increaseCount() {
      this.count++;
    },
    decreaseCount() {
      this.count -= this.count > 0 ? 1 : 0;
    },
  },
};

const sy = new Slety(options).init();
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

btn1.addEventListener("click", () => sy.increaseCount());
btn2.addEventListener("click", () => sy.decreaseCount());
```

## Slety cannot track changes in the following cases

## For arrays

* `sy.nums[0] = 1;`

## Solution

To solve the first problem, you need to use the `setState` method:
```js
const sy = new Slety({
  state: {
    nums: [1, 2, 3, 4, 5],
  },
  observe: {
    nums(newVal) {
      // Now he's reactive!
      console.log(newVal);
    }
  }
}).init();

// 1. The name of the state
// 2. The index of the element being changed
// 3. New value
sy.setState("nums", 0, 1);
```

## For objects

* `sy.obj.c = 3;`

## Solution

To solve this problem, the `setState` method is also used.
```js
const sy = new Slety({
  state: {
    obj: {
      a: 1,
      b: 2,
    },
  },
  observe: {
    obj(newVal) {
      // Now he's reactive!
      console.log(newVal);
    }
  }
}).init();

// 1. The name of the state
// 2. Key name
// 3. New value
sy.setState("obj", "c", 3);
```

If you want to add multiple keys then use this way:

```js
sy.obj = Object.assign({}, sy.obj, { c: 3, d: 4, });
```