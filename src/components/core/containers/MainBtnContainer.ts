const template = document.createElement('template');
template.innerHTML = `
    <article class="main-btn-tab">
    </article>
  `;

export class MainBtnContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML('.main-btn-tab', 'afterbegin', this.renderBtn());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position as InsertPosition, element);
  }

  renderBtn(): string {
    let btn = ``;
    for (let i = 0; i < this.contents.length; i++) {
      btn += `
          <a href="" class="ripple">
            <i src='${this.contents[i].icon}'></i>
            <span>${this.contents[i].label}</span>
          </a>
        `;
    }
    return btn;
  }
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('메인 버튼 탭 이벤트 등록');

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
    //// called when one of attributes listed above is modified
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
