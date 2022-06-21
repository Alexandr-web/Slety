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

## Plans

During the development process, I want to cover topics such as reactivity, virtual DOM, and a couple of options on the Vue object: methods, computed, watch, data...