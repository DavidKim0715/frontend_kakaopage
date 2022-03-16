const template = document.createElement('template');
template.innerHTML =`
<style>
.list-btn{
  display: inline-grid;
}
</style>
`

export class ListBtn extends HTMLElement {
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
    return ['data'];
  }
  /*
   * Methods
   */

  init():void{
    this.node.classList.add('list-btn');
    this.shadowRoot?.appendChild(this.node)
  }

  attachEvents(): void {
    //이벤트 리스터 등록
  }

  // onClickBtn(e: Event): {

  // };
  renderButton(): string {
    let btn = '';
    btn += `
        <span class='${this.contents.icon}'></span>
        <strong>${this.contents.text}</strong>
        <span>${this.contents.subText}</span>
        <span class='arrow-icon'></span>
    `;
    return btn;
  }
  /*
   * life cycle
   */
  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',this.renderButton())
    this.attachEvents();
  }
  disconnectedCallback() {
    // const btn = this.shadowRoot.querySelector('.list-btn');
    // btn.removeEventListener('click', this.onClickBtn);
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
