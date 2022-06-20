export default class TestFramework {
  constructor({ data, watchers, }) {
    this.data = data;
    this.watchers = watchers;
  }

  init() {
    Object.keys(this.data).map(key => {
      let internalValue = this.data[key];

      const watcher = this.watchers[key] ? this.watchers[key].bind(this.data) : null;

      Object.defineProperty(this.data, key, {
        get() {
          return internalValue;
        },

        set(newVal) {
          internalValue = newVal;
          watcher && watcher(newVal);
        }
      });
    });

    return this.data;
  }
};