const template = document.createElement('template');

template.innerHTML = `
    <section class="capital-page-wrapper">
    </section>
  `;

export class CapitalPage extends HTMLElement {
  cardItems = [];
  accountItems = [];
  menuItmes = [];
  contentItems = [];
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML(
      '.capital-page-wrapper',
      'afterbegin',
      `
    <account-container></account-container>`
    );
  }
  /*
   * variables
   */

  // // 외부 스타일을 shadow dom에 적용하기
  // const linkElem = document.createElement('link');
  // linkElem.setAttribute('rel', 'stylesheet');
  // linkElem.setAttribute('href', 'style.css');

  // // 생성된 요소를 shadow dom에 부착하기
  // shadow.appendChild(linkElem);

  static get observedAttributes() {
    return [''];
  }

  /*
   * Methods
   */

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position, element);
  }
  attachEvents(): void {
    console.log('hompage 이벤트 등록');
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
