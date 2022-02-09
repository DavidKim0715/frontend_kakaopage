const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    <button class='menu-btn' type='button'>
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
      .insertAdjacentHTML('afterbegin', this.renderButton());
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
    //이벤트 리스터 등록
    const btn = this.shadowRoot.querySelector('.menu-btn');
    btn.addEventListener('click', this.onClickBtn);
  }

  // onClickBtn(e: Event): {

  // };
  renderButton(): string {
    const btn = '';
    btn += `<span>
      ${this.content.name}
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
    const btn = this.shadowRoot.querySelector('.menu-btn');
    btn.removeEventListener('click', this.onClickBtn);
  }

  set content(newValue: string) {
    this.setAttribute('content', newValue);
  }
  get content(): object {
    return JSON.parse(this.getAttribute('content'));
  }
  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
