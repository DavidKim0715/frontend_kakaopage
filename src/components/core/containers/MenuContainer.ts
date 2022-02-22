const template = document.createElement('template');
template.innerHTML = `
    <style>
    .menu-wrap{
      border : 1px solid black;
      width: 980px;
    }
    .menu-btn-wrapper{
    }
    </style>
    <article class='menu-wrap'>
      <span class="menu-title"></span>
      <div class="menu-btn-wrapper"></div>
    </article>
  `;

export class MenuContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.menuTitle = this.shadowRoot?.querySelector('.menu-title');
    this.renderHTML('.menu-btn-wrapper', 'afterbegin', this.renderMenuButton());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['title', 'contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('dd');
    //이벤트 리스터 등록
  }

  renderMenuButton(): string {
    let btns = '';
    for (let i = 0; i < this.contents.length; i++) {
      const content = JSON.stringify(this.contents[i]);
      btns += `
        <menu-btn content='${content}'>
        </menu-btn>
      `;
    }
    return btns;
  }

  /*
   * life cycle
   */

  getTitleProps(): void {
    const titleData = this.title;
    this.menuTitle.innerText = titleData;
  }

  connectedCallback() {
    this.getTitleProps();
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

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
