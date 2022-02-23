const template = document.createElement('template');
template.innerHTML = `
    <style>
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
    </style>
    <section class="modal-container-wrapper">
      <div class="modal-contents">
        <button type="button" class="close-btn">
          <span class='close-icon'>
          </span>
        </button>
      </div>
    </section>
  `;

export class ModalContainer extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML('.close-btn', 'afterend', this.renderContents());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
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
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
