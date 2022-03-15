const template = document.createElement('template');
template.insertAdjacentHTML('afterbegin',`
<style>
    .main-tab-wrapper{
      position: relative;
    }
    </style>`
)
export class MainTab extends HTMLElement {
  private doc = document;
  private node = this.doc.createElement('div');
  private selectedIndex = 0;
  private contents = [];
  /*
   * constructor
   */


  // const linkElem = document.createElement('link');
  // linkElem.setAttribute('rel', 'stylesheet');
  // linkElem.setAttribute('href', 'style.css');

  // // 생성된 요소를 shadow dom에 부착하기
  // shadow.appendChild(linkElem);

  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.contents = [
      { index: 0, title: 'home-page', data: { name: '홈', url: '' } },
      { index: 1, title: 'capital-page', data: { name: '자산', url: '' } },
      { index: 2, title: 'benefit-page', data: { name: '혜택', url: '' } },
      { index: 3, title: 'quick-menu-page', data: { name: '전체', url: '' } },
    ];

    this.init()
    // this.renderHTML('.main-tab-wrapper', 'afterbegin', this.renderNav());
    // this.renderHTML('tab-nav', 'afterend', this.renderContents());
  }
  /*
   * variables
   */

  //return attributes in setup method
  static get observedAttributes() {
    // browser calls this method when the element is removed from the document
    return [''];
  }

  init():void{
    this.node.classList.add('main-tab-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

  renderNav(): string {
    const content = JSON.stringify(this.contents);
    return `<tab-nav contents='${content}'></tab-nav>`;
  }
  renderContents(): string {
    const content = JSON.stringify(this.contents);
    return `
    <main-contents-container 
      contents='${content}'
       >
    </main-contents-container>
  `;
  }

  attachEvents(): void {
    const tabNav = this.shadowRoot?.querySelector('tab-nav');
    const tabContents = this.shadowRoot?.querySelector(
      'main-contents-container'
    );
    tabNav?.addEventListener('selectedIndex', (event: Event) => {
      this.selectedIndex = event.detail;
      tabContents?.setAttribute('index', this.selectedIndex);
    });
  }

  connectedCallback(): void {
    this.node.insertAdjacentHTML('afterbegin',`
      ${this.renderNav()}
      ${this.renderContents()}
    `)
    this.attachEvents();
  }

  disconnectedCallback(): void {
    // const tabNav = this.shadowRoot?.querySelector('tab-nav');
    // tabNav?.removeEventListener('selectedIndex', (event: Event) => {
    //   this.selectedIndex = event.detail;
    // });
  }

  attributeChangedCallback(name, oldValue, newValue): void {
    // console.log(this.shadowRoot.childNodes[3].children[0], ' <<<<<<<<<<<');
  }
}
