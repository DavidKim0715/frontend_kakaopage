// import './static/scss/_main.scss';
export class PageHeader extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
  }
  /*
   * variables
   */

  //return attributes in setup method
  static get observedAttributes() {
    // browser calls this method when the element is removed from the document
    return [];
  }
  /*
   * Methods
   */
  render() {
    this.shadow = this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadow.innerHTML = `
    <header>
      <img src="/static/media/logo.png" alt="logo" />
    </header>
    `;
  }
  // onCardClick(){

  // }
  /*
   * life cycle
   */
  connectedCallback() {
    // onload = created => event
    this.render();
    console.log('2::: connectedCallback');
  }
  disconnectedCallback() {
    // unmounted => remove binding
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
