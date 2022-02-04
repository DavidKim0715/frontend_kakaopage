export class HomePage extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return [];
  }

  /*
   * Methods
   */
  render() {
    this.shadow = this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadow.innerHTML = `
    <section>
      <account-container></account-container>
      <main-btn-container></main-btn-container>
      <card-slider></card-slider>
      <banner-btn></banner-btn>

    </section>
    `;
  }
  /*
   * life cycle
   */
  connectedCallback() {
    this.render();

    console.log('2::: connectedCallback');
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    //// called when one of attributes listed above is modified

    this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
