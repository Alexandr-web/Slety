export default class VDom {
  constructor(el) {
    this.el = el;
    this.allElementsVDOM = [];
    this.vd = [];
    this.config = {
      characterDataOldValue: true,
      attributeOldValue: true,
      characterData: true,
      attributes: true,
    };
  }

  mutationObserve() {
    if (this.allElementsVDOM.length) {
      const mo = new MutationObserver((mutationsList, observer) => {
        console.log(mutationsList);
      });

      this.allElementsVDOM.map((el) => {
        mo.observe(el, this.config);
      });
    }
  }

  setObjectElement(element) {
    if (element) {
      const attrs = Object.keys(element.attributes).reduce((attributes, key) => {
        attributes[key] = element.attributes[key];
        return attributes;
      }, {});

      const children = [...element.children].map((child) => this.setObjectElement(child));
      const objElement = {
        tag: element.tagName,
        el: element,
        attrs,
        html: element.innerHTML,
        text: element.innerText,
        value: element.value,
        children,
      };

      this.allElementsVDOM.push(element);

      return objElement;
    }
  }
}