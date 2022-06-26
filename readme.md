# Slety

## Description
It's a JavaScript framework inspired by [Vue (v2.x)](https://ru.vuejs.org/), so you'll find a lot of similarities here.

## What has
- [Reactivity](https://github.com/Alexandr-web/Slety/tree/master/options/reactivity.md)

## How to use it
```js
import Slety from "./Slety";

const options = {
  state: { ... },
  observe: { ... },
};

const sy = new Slety(options).init();
```

## Meaning

I want to understand how reactivity works in Vue