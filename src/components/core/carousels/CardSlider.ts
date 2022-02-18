const template = document.createElement('template');
template.innerHTML = `
    <style>
    .slide-wrapper{
      cursor : grab;
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
      border-radius : 0.7em;
      width:  10em;
      height: 10em;
    }
    </style>
    <article class="slide-wrapper">
      <div class="slide-list">
      </div>
    </article>
  `;

export class CardSlider extends HTMLElement {
  slideWidth = 400;
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
        <a class="slide-item" >
          <strong>${this.contents[i].mainText}<br></strong>
          <span>${this.contents[i].subText}<br></span>
          <img 
          src='${this.contents[i].image}'
          "alt="${this.contents[i].desc}"
          />
        </a>
      `;
    }
    return cards;
  }

  /*
   * life cycle
   */

  connectedCallback() {
    //mount
    this.shadowRoot.querySelector('.slide-list').style.width =
      this.contents.length * this.slideWidth + 'px';
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
