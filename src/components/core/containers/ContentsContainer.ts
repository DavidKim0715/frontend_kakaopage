const template = document.createElement('template');
template.innerHTML = `
    <style>
    .contents-container-wrapper{
      display: flex;
      flex-direction: column;
    }
    .
    </style>
    <article class='contents-container-wrapper'>
      <span class="contents-container-title"></span>
    </article>
  `;

export class ContentsContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.containerTitle = this.shadowRoot?.querySelector(
      '.contents-container-title'
    );
    this.renderHTML(
      '.contents-container-title',
      'afterend',
      this.renderListBtn()
    );
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position as InsertPosition, element);
  }

  renderListBtn(): string {
    let btns = '';
    for (let i = 0; i < this.contents.data.length; i++) {
      btns += `
        <list-btn 
            contents='${JSON.stringify(this.contents.data[i])}'
        >
        </list-btn>
      `;
    }
    return btns;
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
