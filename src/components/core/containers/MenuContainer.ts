const template = document.createElement('template');
template.innerHTML = 
`<style>
.menu-wrap{
  border : 1px solid black;
  width: 980px;
}
.menu-btn-wrapper{
}
</style>
`

export class MenuContainer extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('article')
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
    return ['title', 'contents'];
  }

  /*
   * Methods
   */

  init(): void{
    this.node.classList.add('menu-wrap')
    this.shadowRoot?.appendChild(this.node)
  }

  attachEvents(): void {
    console.log('dd');
    //이벤트 리스터 등록
  }

  renderMenuButton(): string {
    let btns = '';
    for (let i = 0; i < this.contents.length; i++) {
      const content = JSON.stringify(this.contents[i]);
      btns += `
        <menu-btn 
        content='${content}' 
        font-size='0.5em'
        >
        </menu-btn>
      `;
    }
    return btns;
  }

  /*
   * life cycle
   */


  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin', `
      <span class="menu-title">${this.title}</span>
      <div class="menu-btn-wrapper">
        ${this.renderMenuButton()}
      </div>
    `)
    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set title(newValue: string) {
    this.setAttribute('title', newValue);
  }
  get title() : string{
    return this.getAttribute('title') as string;
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
