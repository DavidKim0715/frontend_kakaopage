const template = document.createElement('template');
template.innerHTML = `
    <style>

    </style>
    <button>
    <i>
      icon
    </i>
  </button>
    `;

export class IconBtn extends HTMLElement {
  label  = ''
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

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
    return [''];
  }
  /*
   * Methods
   */
  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }

  attachEvents(): void {
    //이벤트 리스터 등록
    // const btn = this.shadowRoot.querySelector('.menu-btn');
    // btn.addEventListener('click', this.onClickBtn);
  }

  // onClickBtn(e: Event): {

  // };
  /*
   * life cycle
   */
  connectedCallback() {
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
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}







export class BannerBtn extends HTMLElement {
  /*
  * constructor
  */
  label  = ''
  
  /*
  * variables
  */

  static get observedAttributes() { 
    return [] 
  }
 /*
  * Methods
  */
    bind(element) {
        element.render = element.render.bind(element)
    }
    render(){
        this.shadow = this.attachShadow({ mode: "open" }) // DOM scope 생성
        this.shadow.innerHTML=`
        <button>
          banner button
        </button>
        `
  }
  /*
  * life cycle
  */
  connectedCallback() { 
    this.render()

    console.log('2::: connectedCallback')

  }
  disconnectedCallback() { 
    console.log('3::: disconnectedCallback')
  }
  attributeChangedCallback(name, oldValue, newValue) { //// called when one of attributes listed above is modified

    this.connectedCallback() //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
 }
