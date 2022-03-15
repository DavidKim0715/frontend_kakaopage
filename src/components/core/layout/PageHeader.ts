// import { logo } from 'src/static/image/logo.png';
const template = document.createElement('template');
template.insertAdjacentHTML('afterbegin', `
<style>
  .page-header-wrapper{

  }
  .logo-img{
    
  }
  </style>
   <header class='page-header-wrapper'>
      <img class='logo-img' loading='lazy'/>
    </header>`
    )

export class PageHeader extends HTMLElement {
  private logo : HTMLElement | null = null
  /*
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.logo = this.shadowRoot?.querySelector('.logo-img') as HTMLElement;
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }

  /*
   * Methods
   */

  attachEvents(): void {
    console.log('dd');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    // this.logo.style.background = "url: 'static/image/logo.png'";
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() : object {
    return JSON.parse(this.getAttribute('contents') as string);
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
// window.customElements.define('page-header', PageHeader);
