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

export class BannerSlider extends HTMLElement {
  slideWidth = 400;
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML('.slide-list', 'afterbegin', this.renderCard());
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
    console.log('ee');
    //이벤트 리스터 등록
    const btn = this.shadowRoot?.querySelector('.slide-list');
    btn?.addEventListener('click', this.onClickBtn);
  }

  renderCard(): string {
    let cards = ``;
    const len = this.contents?.length;
    for (let i = 0; i < len; i++) {
      const content = this.cotents[i];
      cards += `
        <img src='${content?.imgPath}' alt='${content?.imgPath}'/>
      `;
    }
    return cards;
  }

  /*
   * life cycle
   */

  connectedCallback() {
    //mount
    const slide = this.shadowRoot?.querySelector('.slide-list');
    slide!.style.width = this.contents.length * this.slideWidth + 'px';
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
