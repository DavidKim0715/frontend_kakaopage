const template = document.createElement('template');
template.innerHTML = `
    <footer class='page-footer'>
    </footer>
  `;

export class PageFooter extends HTMLElement {
  items = [];
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.items = [
      { idx: 0, text: '고객센터', url: '' },
      { idx: 1, text: '신고하기', url: '' },
      { idx: 2, text: '홈페이지', url: '' },
      { idx: 3, text: '페이스북', url: '' },
    ];
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML('.page-footer', 'afterbegin', this.renderFooterLink());
    this.renderHTML('.footer-link', 'afterend', this.renderFooterTable());
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
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position, element);
  }

  renderFooterLink(): string {
    return `
      <footer-link 
      class='footer-link'
       contents='${JSON.stringify(this.items)}'>
      >
      </footer-link>
    `;
  }
  renderFooterTable(): string {
    return `
      <footer-table class='footer-table'></footer-table>
    `;
  }

  attachEvents(): void {
    console.log('메인 버튼 탭 이벤트 등록');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  // getContentsProps(): void {
  //   const contentsData
  // }

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
