const template = document.createElement('template');
template.innerHTML =`
<style>
.text-btn{
  background-color: gray;
  border: none;
  border-radius: 4em;
  color: #fff;
  width : 8em;
  height : 5em;
}
.text-title{
  font-size : 3em;
}
</style>
`

export class TextBtn extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('button')
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
  // // 외부 스타일을 shadow dom에 적용하기
  // const linkElem = document.createElement('link');
  // linkElem.setAttribute('rel', 'stylesheet');
  // linkElem.setAttribute('href', 'style.css');

  // // 생성된 요소를 shadow dom에 부착하기
  // shadow.appendChild(linkElem);

  static get observedAttributes() {
    return ['title'];
  }

  /*
   * Methods
   */

  init(): void {
    this.node.classList.add('text-btn');
    this.node.type='button'
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
    <span class="text-title">${this.title}</span>
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
   //
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
