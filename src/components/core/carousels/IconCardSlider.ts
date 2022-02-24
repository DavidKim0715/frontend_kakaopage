const template = document.createElement('template');
template.innerHTML = `
    <style>
    .slide-wrapper{
      display : block;
      position: relative; 
      margin : 0 auto;
      width: 1000px;
      overflow-x: hidden;
    }
    .slide-list{
      display: inline-flex;
      justify-content: space-around;
      margin: auto; 
      pointer-events: none;
      width: 100%; 
    }
    .slide-item{
      border : 1px solid black;
      border-radius : 2.7em;
      width:  900px;
      height: 800px;
    }
    </style>
    <article class="slide-wrapper">
      <div class="slide-list">
      </div>
    </article>
  `;

export class IconCardSlider extends HTMLElement {
  pressed = false;
  slide = '';
  slideWidth = 960;
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML('.slide-list', 'afterbegin', this.renderCard());
    this.slide = this.shadowRoot?.querySelector('.slide-list');
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
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }
  /*
   * Methods
   */

  renderCard(): string {
    let cards = ``;
    const len = this.contents?.length;
    for (let i = 0; i < this.contents?.length; i++) {
      const content = this.contents[i];
      cards += `
        <a class="slide-item">
          <span src=${this.contents[i].url}><br></span>
          <span>${this.contents[i].subText}<br></span>
          <strong>${this.contents[i].mainText}</strong>
        </a>
      `;
    }
    return cards;
  }

  opratePosition(): void {
    //
  }

  attachEvents(): void {
    this.slide.addEventListener('mousedown', (e: Event) => {
      pressed = true;
      // startx = e.offsetX - innerSlider.offsetLeft;
      this.slide.style.cursor = 'grabbing';
    });
    this.slide.addEventListener('mouseenter', (e: Event) => {
      this.slide.style.cursor = 'grab';
    });

    this.slide.addEventListener('mouseup', (e: Event) => {
      this.slide.style.cursor = 'grab';
    });
    this.slide.addEventListener('mousemove', (e: Event) => {
      if (!pressed) {
        return;
      }
      e.preventDefault();
    });
  }

  /*
   * life cycle
   */

  connectedCallback() {
    //mount
    this.slide!.style.width = this.contents.length * this.slideWidth + 'px';
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
