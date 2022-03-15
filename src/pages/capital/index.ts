const template = document.createElement('template');
template.insertAdjacentHTML('afterbegin', `
<style>
 @media (min-width: 1080px) {
  .capital-page-wrapper{
    width: 1080px;
  }
</style>
<section class="capital-page-wrapper">
</section>
`)

export class CapitalPage extends HTMLElement {
  private cardItems = [];
  private menuItmes = [];
  private contentItems = [];
  private capitalItems = {};
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.capitalItems = {
      title: '순자산',
      account: 12314,
    };
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML(
      '.capital-page-wrapper',
      'afterbegin',
      `
    <capital-container
      contents='${JSON.stringify(this.capitalItems)}'>
    ></capital-container>`
    );
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
    return [''];
  }

  /*
   * Methods
   */

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }
  renderLinkBtn(): string {
    return `
      
    `;
  }
  attachEvents(): void {
    console.log('hompage 이벤트 등록');
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
  get contents() : object {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
