const template = document.createElement('template');
template.innerHTML = `
    <style>
    .list-btn{
      display: inline-grid;
    }
    </style>
    <a class='list-btn'>
    </a>
    `;

export class ListBtn extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    const list =  this.shadowRoot?.querySelector('.list-btn')
    list.href = this.contents.url;
    this.renderHTML('.list-btn', 'afterbegin', this.renderButton());
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
    return ['data'];
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
    // const btn = this.shadowRoot.querySelector('.menu-btn');
    // btn.addEventListener('click', this.onClickBtn);
  }

  // onClickBtn(e: Event): {

  // };
  renderButton(): string {
    let btn = '';
    btn += `
        <i src='${this.contents.icon}'></i>
        <strong>${this.contents.text}</strong>
        <span>${this.contents.subText}</span>
    `;
    return btn;
  }
  /*
   * life cycle
   */
  connectedCallback() {
    this.attachEvents();
  }
  disconnectedCallback() {
    // const btn = this.shadowRoot.querySelector('.list-btn');
    // btn.removeEventListener('click', this.onClickBtn);
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
