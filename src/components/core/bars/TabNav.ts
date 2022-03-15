const template = document.createElement('template');
template.insertAdjacentHTML('afterbegin', `
<style>
    .tab-nav-wrapper{
      position : absolute;
    }
    .tab-nav{
      display : grid;
      grid-template-column : repeat(auto-fill, 1fr);
    }
    .tab-line{
      background-color : black;
      border : 0;
      transition : all 0.3s ease-in-out;
    }
    </style>
   `
    )

export class TabNav extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('div')

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
    return ['contents'];
  }

  /*
   * Methods
   */

  init():void{
    this.node.classList.add('tab-nav-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }
  renderButton(): string {
    let btns = ``;
    const len = this.contents.length;
    for (let i = 0; i < len; i++) {
      const data = this.contents[i];
      const idx = this.contents[i].index;
      const content = JSON.stringify(data.data);
      btns += `
            <menu-btn
              content='${content}'
              index=${idx}
              font-size='0.7em'
              >
            </menu-btn>
          `;
    }
    btns += `<hr class="tab-line">`
    return btns;
  }

  onClickBtn(e : Event){
    const target = e.target as HTMLElement;
    // const a = e.target?.shadowRoot.querySelector('a')
    target.classList.add('selected')
    this.dispatchEvent(new CustomEvent('selectedIndex', { detail: target.getAttribute('index') })); //emit tabIndex
  }
  attachEvents(): void {
    this.node.addEventListener('click', this.onClickBtn)
    
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin', `
      <nav class="tab-nav">
        ${ this.renderButton()}
      </nav>
    `)

    // const tabNav = this.node.querySelector('.tab-nav')
    // const len = tabNav?.children?.length-1
    // tabNav.style.gridTemplateColumns = `repeat(${len}, 1fr)`
    // console.log(tabNav,'<<<<<<<<<<<<<<<<<<<')
    this.attachEvents();
  }
  disconnectedCallback() {
    //
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() :object{
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
