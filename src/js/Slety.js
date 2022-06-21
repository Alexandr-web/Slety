export default class Slety {
  constructor({ state, observe, }) {
    this.state = state;
    this.observe = observe;
  }

  init() {
    Object.keys(this.state).map((key) => {
      let internalValue = this.state[key];

      const observer = this.observe[key] ? this.observe[key].bind(this.state) : null;

      Object.defineProperty(this.state, key, {
        get() {
          return internalValue;
        },

        set(newVal) {
          if (observer) {
            observer(newVal, internalValue);
          }

          internalValue = newVal;
        },
      });
    });

    return this.state;
  }
}