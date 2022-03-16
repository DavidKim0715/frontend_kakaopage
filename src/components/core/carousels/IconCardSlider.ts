const template = document.createElement('template');
template.innerHTML =`
<style>
.slide-wrapper{
  display : block;
  position: relative; 
  margin : 0 auto;
  width: 800px;
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
  border-radius : 2.7em;
  width:  800px;
  height: 800px;
}
</style>
`

export class IconCardSlider extends HTMLElement {
  private doc = document
  private node = this.doc.createElement('article')
  private slideWidth = 960;
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.init()
    // this.slide = this.shadowRoot?.querySelector('.slide-list') as HTMLElement;
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


  /*
   * Methods
   */

  init():void {
    this.node.classList.add('slide-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

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
    // this.slide.addEventListener('mousedown', (e: Event) => {
    //   pressed = true;
    //   // startx = e.offsetX - innerSlider.offsetLeft;
    //   this.slide.style.cursor = 'grabbing';
    // });
    // this.slide.addEventListener('mouseenter', (e: Event) => {
    //   this.slide.style.cursor = 'grab';
    // });

    // this.slide.addEventListener('mouseup', (e: Event) => {
    //   this.slide.style.cursor = 'grab';
    // });
    // this.slide.addEventListener('mousemove', (e: Event) => {
    //   if (!pressed) {
    //     return;
    //   }
    //   e.preventDefault();
    // });
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
    <div class="slide-list">
      ${this.renderCard()}
    </div>
    `)
    //mount
    const subNode= this.node.querySelector('.slide-list') as HTMLElement;
    subNode.style.width = this.contents.length * this.slideWidth + 'px';
    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
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
