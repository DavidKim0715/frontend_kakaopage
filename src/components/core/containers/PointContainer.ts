const template = document.createElement('template');
template.innerHTML = `
    <article>
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
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.containerTitle = this.shadowRoot.querySelector('.title');
    this.pointInfo = this.shadowRoot.querySelector('.point-info');
    this.renderHTML('.point-info', 'afterbegin', this.renderInfo());
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

  renderInfo(): void {
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

  // getContentsProps(): void {
  //   const contentsData
  // }

  connectedCallback() {
    this.getTitleProps();
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
