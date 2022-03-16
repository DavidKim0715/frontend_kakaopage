const template = document.createElement('template');
template.innerHTML =`
<style>
    .menu-btn{
      text-align : center;
    }
    .menu-btn-text{
      font-size : 4.5em;
      display: table-cell;
    }
    .selected{
      color : black;
      border-bottom: 2px solid black;
      padding-bottom: 1.15em;
   }
    </style>
    `
export class MenuBtn extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('a')
  /*
   * constructor
   */
  constructor() {
    // initializtion
    super(); 

    //Append shadowDom 
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    //init-call connectedCallback
    this.init()
  }

   /*
   * variables
   */

   static get observedAttributes() {
    return ['content', 'index', 'font-size', 'font-color'];
  }

  /*
   * Methods
   */

  set fontSize(newValue: string) {
    this.setAttribute('font-size', newValue);
  }
  get fontSize(): string {
    return this.getAttribute('font-size') as string;
  }
  set fontColor(newValue: string) {
    this.setAttribute('color', newValue);
  }
  get fontColor(): string {
    return this.getAttribute('color') as string;
  }

  set content(newValue: object) {
    this.setAttribute('content', newValue);
  }
  get content(): object {
    return JSON.parse(this.getAttribute('content') as string);
  }

  set index(newValue: number) {
    this.setAttribute('index', newValue);
  }
  get index(): number {
    return parseInt(this.getAttribute('index') as string);
  }

  init():void{
    this.node.classList.add('menu-btn');
    this.shadowRoot?.appendChild(this.node)
  }
  attachEvents(): void {
    //이벤트 리스터 등록
    // this.btn?.addEventListener('click', this.onClickBtn);
  }

  // onClickBtn(e: Event): {

  // };
  renderText(): string {
    let btn = '';
    btn += `<span class='menu-btn-text'>
      ${this.content.name}
    </span>`;
    return btn;
  }

  /*
   * life cycle
   */
  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',this.renderText())

    this.node.style.fontSize  = this.fontSize;
    this.node.style.color = this.fontColor;

    this.attachEvents();
  }
  disconnectedCallback() {
    // this.btn?.removeEventListener('click', this.onClickBtn);
  }


  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
