const template = document.createElement('template');
template.innerHTML = `
    <style>
    .link-arrow-btn{
    }
    </style>
    <button
      class="link-arrow-btn"
      type='button'
    >
      <span class='text-title'></span>
      <span class='arrow-icon'></span>
    </button>
  `;

export class LinkArrowBtn extends HTMLElement {
  textTitle = '';
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.textTitle = this.shadowRoot.querySelector('.text-title');
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
    return ['title'];
  }

  /*
   * Methods
   */

  attachEvents(): void {
    //이벤트 리스터 등록
  }

  getTitleProps(): void {
    const titleData = this.title;
    this.textTitle.innerText = titleData;
  }

  /*
   * life cycle
   */

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
  get title(): string {
    return this.getAttribute('title');
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
