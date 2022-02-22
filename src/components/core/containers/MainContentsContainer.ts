const template = document.createElement('template');
template.innerHTML = `
    <style>
    .main-contents-page-wrapper{
      overflow-x: hidden;
      display : flex;
    }
    .page-detail{
      width : 980px;
    }
    </style>
    <main class="main-contents-page-wrapper">
    </main>
  `;

export class MainContentsContainer extends HTMLElement {
  containerWidth = 1000;
  slide = '';
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML(
      '.main-contents-page-wrapper',
      'afterbegin',
      this.renderPage()
    );
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents', 'index'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position as InsertPosition, element);
  }

  renderPage(): string {
    let pages = ``;
    const len = this.contents.length;
    for (let i = 0; i < len; i++) {
      pages += `
      <${this.contents[i].title}></${this.contents[i].title}>`;
    }
    return pages;
  }
  /*
   * Methods
   */

  attachEvents(): void {
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.slide = this.shadowRoot?.querySelector('.main-contents-page-wrapper');
    this.slide.style.width = this.containerWidth * this.contents.length + 'px';
    this.slide.style.transition = '300ms';
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

  set index(newValue: any) {
    this.setAttribute('index', newValue);
  }
  get index() {
    return parseInt(this.getAttribute('index'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    this.slide.style.transform =
      'translate3d(-' + this.containerWidth * this.index + 'px, 0px, 0px)';
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
