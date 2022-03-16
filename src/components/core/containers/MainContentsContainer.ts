const template = document.createElement('template');
template.innerHTML =`
<style>
    .main-contents-page-wrapper{
      overflow-x: hidden;
      display : flex;
    }
    .page-detail{
      width : 1080px;
    }
    </style>
  `

export class MainContentsContainer extends HTMLElement {
  private doc = document
  private containerWidth = 1080;
  private node  = this.doc.createElement('main')
  /*
   * constructor
   */
  constructor() {
    super(); // initializtion

    //Append shadowDom 
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    //init-call connectedCallback
    this.init()
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents', 'index'];
  }

  /*
   * Methods
   */

  init(): void{
    this.node.classList.add('main-contents-page-wrapper')
    this.shadowRoot?.appendChild(this.node)
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
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin', this.renderPage())
    this.node.style.width = this.containerWidth * this.contents.length + 'px';
    this.node.style.transition = '300ms';
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  set index(newValue: any) {
    this.setAttribute('index', newValue);
  }
  get index() {
    return parseInt(this.getAttribute('index') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    this.node.style.transform =
      'translate3d(-' + this.containerWidth * this.index + 'px, 0px, 0px)';
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
