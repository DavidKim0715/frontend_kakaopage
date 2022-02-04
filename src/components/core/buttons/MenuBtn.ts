const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    <button type='button'>
    </button>
    `;

export class MenuBtn extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      .querySelector('button')
      .insertAdjacentHTML('afterbegin', this.renderMenu());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['data'];
  }
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('dd');
    //이벤트 리스터 등록
  }

  renderButton(): string {
    const btn = '';
    btn += `<span>
      ${data.name}
    </span>`;
    return btn;
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

  set data(newValue: string) {
    this.setAttribute('data', newValue);
  }
  get data() {
    return this.getAttribute('data');
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
