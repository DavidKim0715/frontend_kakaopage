const template = document.createElement('template');
template.innerHTML =`
<style></style>
`
export class PageFooter extends HTMLElement {
  private doc = document;
  private node= this.doc.createElement('footer')
  private items = [];
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
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    
    this.init()
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

  init(): void{
    this.node.classList.add('page-footer')
    this.shadowRoot?.appendChild(this.node)
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
    this.node.insertAdjacentHTML('afterbegin',`
      ${this.renderFooterLink()}
      ${this.renderFooterTable()}
    `)
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() :object {
    return JSON.parse(this.getAttribute('contents') as string);
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
