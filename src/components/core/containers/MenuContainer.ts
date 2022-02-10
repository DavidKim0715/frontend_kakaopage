const template = document.createElement('template');
template.innerHTML = `
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
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.menuTitle = this.shadowRoot.querySelector('.menu-title');
    this.shadowRoot
      ?.querySelector('.menu-btn-wrapper')
      .insertAdjacentHTML('afterbegin', this.renderMenuButton());
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
    return ['title', 'contents'];
  }

  renderElement(tag: string, position: string, el: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    const element = document.createElement(el);
    data.insertAdjacentElement(position, element);
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

  // getContentsProps(): void {
  //   const contentsData
  // }

  connectedCallback() {
    this.getTitleProps();
    // this.getContentsProps();
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
    // switch (name) {
    //   case 'title':
    //     this.menuTitle.innerText = newValue;
    //     break;
    //   case 'contents':
    //     console.log(JSON.parse(newValue));
    //     break;
    //   default:
    //     break;
    // }
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
