const template = document.createElement('template');
template.innerHTML = `
    <style>
    .slide-wrapper{
      position: relative; 
      width: 400px; 
      padding: 30px 0;
    }
    .slide-list{
      display: inline-flex;
      width: 100%; 
      margin: auto; 
      overflow-x: hidden;
    }
    .slide-item{
        border : 1px solid black;
        width:  300px;
        height: 200px;
    }
    </style>
    <article class="slide-wrapper">
      <div class="slide-list">
      </div>
    </article>
  `;

export class IconCardSlider extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML('.slide-list', 'afterbegin', this.renderCard());
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
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('ee');
    //이벤트 리스터 등록
    const btn = this.shadowRoot.querySelector('.slide-list');
    btn.addEventListener('click', this.onClickBtn);
  }

  renderCard(): string {
    let cards = ``;
    for (let i = 0; i < this.contents?.length; i++) {
      cards += `
        <div class="slide-item">
          <i src=${this.contents[i].url}><br></i>
          <span>${this.contents[i].subText}<br></span>
          <strong>${this.contents[i].mainText}</strong>
        </div>
      `;
    }
    return cards;
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
