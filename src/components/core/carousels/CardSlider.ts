const template = document.createElement('template');
template.innerHTML =`
<style>
.slide-wrapper{
  // display : block;
  // position: relative; 
  // margin : 0 auto;
  // width: 800px;
  // overflow-x: hidden;
}
.slide-list{
  scroll-snap-type: x proximity;
  overflow-x: scroll;
  display: flex;
  pointer-events: none;
  // display: inline-flex;
  // justify-content: space-around;
  // margin: auto; 
  // pointer-events: none;
  // width: 100%; 
}
.slide-item{
  display: inline-block;
  scroll-snap-align: center;
  margin-right: 3rem;
  width : 40vh;
  height: 20vh;
  // border-radius : 2.7em;
  // width:  800px;
  // height: 800px;
}
</style>
`

export class CardSlider extends HTMLElement {
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
  }
  /*
   * variables
   */

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
        <a class="slide-item" >
          <strong>${content.mainText}<br></strong>
          <span>${content.subText}<br></span>
          <img 
          src='${content.imgPath}'
          "alt="${content.desc}"
          />
        </a>
      `;
    }
    return cards;
  }
  

  attachEvents(): void {
   //
  }

  /*
   * life cycle
   */

  randomHsl() : string{
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`
  } 
  operateSlideWidth():void{
    const subNode= this.node.querySelector('.slide-list') as HTMLElement;
    subNode.style.width = this.contents.length * this.slideWidth + 'px';

  }
  paintCard() : void{
    const element = this.node.querySelectorAll('.slide-item') as NodeList;
    element.forEach((el) => {
      el.style.backgroundColor = this.randomHsl()
    })
  }
  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
    <div class="slide-list">
      ${this.renderCard()}
    </div>
    `)
    //mount

    
    this.operateSlideWidth()
    this.paintCard();
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
    //// called when one of attributes listed above is modified
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
