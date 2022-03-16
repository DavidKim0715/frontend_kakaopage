const template = document.createElement('template');
template.innerHTML =`
<style>
.link-arrow-btn{
}
</style>
`
export class LinkArrowBtn extends HTMLElement {
  private doc =document
  private node = this.doc.createElement('button')
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
    return ['title'];
  }

  /*
   * Methods
   */
  init(): void {
    this.node.classList.add('link-arrow-btn')
    this.node.type="button"
    this.shadowRoot?.appendChild(this.node)
  }
  attachEvents(): void {
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
    <span class='text-title'>${this.title}</span>
    <span class='arrow-icon'></span>
  `)
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set title(newValue: string) {
    this.setAttribute('title', newValue);
  }
  get title(): string {
    return this.getAttribute('title') as string;
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
    // switch (name) {
    //   case 'title':
    //     this.menuTitle.innerText = newValue;
    //     break;
    //   case 'contents':
    //     console.log(JSON.parse(newValue));
    //     break;
    //   default:
    //     break;
    // }
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
