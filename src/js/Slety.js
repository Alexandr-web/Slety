export default class Slety {
  constructor({ state = {}, observe = {}, actions = {}, }) {
    this.state = state;
    this.observe = observe;
    this.actions = actions;
    this.data = {};
  }

  setState(stateKey, key, val) {
    const getArray = (obj) => {
      return Object.keys(obj).reduce((array, index) => {
        array[index] = obj[index];

        return array;
      }, []);
    };

    if (!Array.isArray(this.data[stateKey])) {
      this.data[stateKey] = Object.assign({}, this.data[stateKey], { [key]: val, });
      Object.assign(this.state, { ...this.data[stateKey], });
    } else {
      this.data[stateKey] = getArray(Object.assign({}, this.data[stateKey], { [key]: val, }));
      this.state[stateKey] = getArray(this.data[stateKey]);
    }

    this.setReactivity();
  }

  setReactivity() {
    Object.keys(this.data).map((key) => {
      if (!Object.keys(this.actions).includes(key)) {
        let currentValue = this.data[key];

        const observer = this.observe[key] ? this.observe[key].bind(this.data) : null;

        Object.defineProperty(this.data, key, {
          get() {
            return currentValue;
          },

          set(newVal) {
            if (observer) {
              observer(newVal, currentValue);
            }

            currentValue = newVal;
          },
        });
      }
    });
  }

  init() {
    this.data = Object.assign({}, this.state, { setState: this.setState.bind(this), });

    Object.keys(this.actions).map((key) => this.actions[key] = this.actions[key].bind(this.data));
    Object.assign(this.data, this.actions);

    this.setReactivity();

    return this.data;
  }
}