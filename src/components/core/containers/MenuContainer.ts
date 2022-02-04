const template = document.createElement('template');
template.innerHTML = `
    <article class='menu-wrap'>
      <span class="menu-title"></span>
    </article>
  `;

export class MenuContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.menuTitle = this.shadowRoot.querySelector('.menu-title');
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['title', 'items'];
  }
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('dd');
    //이벤트 리스터 등록
  }

  renderMenuButton(): string {
    const btns = '';
    for (let i = 0; i < this.items.length; i++) {
      btns += `
        <menu-btn ></menu-btn>
      `;
    }
    return btns;
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

  set title(newValue: string) {
    this.setAttribute('title', newValue);
  }
  get title() {
    return this.getAttribute('title');
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //// called when one of attributes listed above is modified
    switch (name) {
      case 'title':
        this.menuTitle.innerText = newValue;
        break;
      default:
        break;
    }
    this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
