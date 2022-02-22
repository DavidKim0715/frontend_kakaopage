const template = document.createElement('template');
template.innerHTML = `
  <style>
  .point-wrapper{
    border : 1px solid black;
    width: 980px;
  }
  </style>
    <article class='point-wrapper'>
      <span class="title"></span>
      <span class="point-info"></span>
    </article>
  `;

export class PointContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.containerTitle = this.shadowRoot?.querySelector('.title');
    this.pointInfo = this.shadowRoot?.querySelector('.point-info');
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
    const pointData = this.contents.account;
    this.pointInfo.innerText = pointData + 'P';
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
    const titleData = this.contents.title;
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
