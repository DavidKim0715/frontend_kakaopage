const template = document.createElement('template');
template.innerHTML = `<style>
.modal-container-wrapper{
  display : flex;
  position:fixed; 
  width:100%; 
  height:100vh;
}
.close-btn{
  
}
.close-icon{
  
}
.closed{
  display : none;
}
</style>`

export class ModalContainer extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('main')
  /*
   * constructor
   */
  constructor() {
    super(); // initializtion

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

  init(): void{
    this.node.classList.add('modal-container-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

  renderContents(): string {
    return ''
  }
  closeModal():void{
    const modal = this.shadowRoot?.querySelector('.modal-container-wrapper')
    modal?.classList.add("closed");
  }
  /*
   * Methods
   */

  attachEvents(): void {
    const btn = this.shadowRoot?.querySelector('.close-btn')
    btn?.addEventListener('click',this.closeModal)
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
      <div class="modal-contents">
      <button type="button" class="close-btn">
        <span class='close-icon'>
        </span>
        ${this.renderContents()}
      </button>
    </div>
    `)
    this.attachEvents();
  }
  disconnectedCallback() {
    const btn = this.shadowRoot?.querySelector('.close-btn')
    btn?.addEventListener('click',this.closeModal)
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() :object {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
