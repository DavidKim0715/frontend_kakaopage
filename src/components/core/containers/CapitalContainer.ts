const template = document.createElement('template');
template.innerHTML = `
  <style>
  .capital-wrapper{
      display : block;
      height : 300px;
      margin : 0 auto;
      width: 1000px;
  }
  </style>
    <article class='capital-wrapper'>
      <div>
        <span class="title"></span>
        <span class="refresh-icon"></span>
      </div>
      <span class="capital-info"></span>
    </article>
  `;

export class CapitalContainer extends HTMLElement {
  capitalInfo = '';
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.containerTitle = this.shadowRoot?.querySelector('.title');
    this.capitalInfo = this.shadowRoot?.querySelector('.capital-info');
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

  getInfoProps(): void {
    const capitalData = this.contents?.account;
    this.capitalInfo.innerText = capitalData + '원';
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

  getTitleProps(): void {
    const titleData = this.contents?.title;
    this.containerTitle.innerText = titleData;
  }

  connectedCallback() {
    this.getTitleProps();
    this.getInfoProps();
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
