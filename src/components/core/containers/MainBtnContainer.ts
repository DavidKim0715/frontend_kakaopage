const template = document.createElement('template');
template.innerHTML =`
<style>
.main-btn-tab{
  display : block;
  margin : 0 auto;
  width: 1000px;
  height : 300px;
}
.ripple{
}
.main-btn-text{
  font-size : 3em;
}
</style>
`

export class MainBtnContainer extends HTMLElement {
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
    return ['contents', 'rows-per-contents'];
  }

  /*
   * Methods
   */

  init(): void{
    this.node.classList.add('main-btn-tab')
    this.shadowRoot?.appendChild(this.node)
  }

  renderBtn(): string {
    let btn = ``;
    const len = this.contents?.length;
    for (let i = 0; i < len; i++) {
      btn += `
          <a href="" class="ripple">
            <span src='${this.contents[i].icon}'></span>
            <span class='main-btn-text'>${this.contents[i].label}</span>
          </a>
        `;
    }
    return btn;
  }

  attachEvents(): void {
    console.log('메인 버튼 탭 이벤트 등록');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
      ${this.renderBtn()}
    `)
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set rosPerContents(newValue: string) {
    this.setAttribute('rows-per-contents', newValue);
  }
  get rosPerContents(): number {
    return parseInt(this.getAttribute('rows-per-contents') as string);
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
