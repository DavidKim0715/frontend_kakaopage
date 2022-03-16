const template = document.createElement('template');
template.innerHTML =`
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
    </style>`

export class BannerSlider extends HTMLElement {
  private doc = document
  private node = this.doc.createElement('article');
  private slideWidth = 400;
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
  init(): void{
    this.node.classList.add(`slide-wrapper`)
    this.shadowRoot?.appendChild(this.node)
  }
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
    this.node.insertAdjacentHTML('afterbegin',`
      <div class="slide-list">
        ${this.renderCard()}
      </div>
    `)
    //mount
    const slide = this.shadowRoot?.querySelector('.slide-list') as HTMLElement;
    slide.style.width = this.contents.length * this.slideWidth + 'px';
    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: ) {
    this.setAttribute('contents', newValue);
  }
  get contents() : object{
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
