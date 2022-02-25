const template = document.createElement('template');
template.innerHTML = `
    <style>
    .menu-btn{
      text-align : center;
    }
    .menu-btn-text{
      font-size : 4.5em;
      display: table-cell;
    }
    </style>
    <a class='menu-btn'>
    </a>
    `;

export class MenuBtn extends HTMLElement {
  btn = '';
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.btn = this.shadowRoot?.querySelector('.menu-btn');
    this.renderHTML('.menu-btn', 'afterbegin', this.renderButton());
    this.btn.style.fontSize = this.fontSize;
    this.btn.style.color = this.fontColor;
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['content', 'index', 'font-size', 'font-color'];
  }
  /*
   * Methods
   */
  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }

  attachEvents(): void {
    //이벤트 리스터 등록
    this.btn?.addEventListener('click', this.onClickBtn);
  }

  // onClickBtn(e: Event): {

  // };
  renderButton(): string {
    let btn = '';
    btn += `<span class='menu-btn-text'>
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
    this.btn?.removeEventListener('click', this.onClickBtn);
  }

  set fontSize(newValue: string) {
    this.setAttribute('font-size', newValue);
  }
  get fontSize(): object {
    return this.getAttribute('font-size');
  }
  set fontColor(newValue: string) {
    this.setAttribute('color', newValue);
  }
  get fontColor(): object {
    return this.getAttribute('color');
  }

  set content(newValue: string) {
    this.setAttribute('content', newValue);
  }
  get content(): object {
    return JSON.parse(this.getAttribute('content'));
  }

  set index(newValue: number) {
    this.setAttribute('index', newValue);
  }
  get index(): number {
    return parseInt(this.getAttribute('index'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
