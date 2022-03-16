const template = document.createElement('template');
template.innerHTML =`
<style>
.capital-wrapper{
    display : block;
    height : 300px;
    margin : 0 auto;
    width: 1000px;
}
</style>
`

export class CapitalContainer extends HTMLElement {
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
    return ['contents'];
  }

  /*
   * Methods
   */
  init(): void{
    this.node.classList.add('contents-container-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

  attachEvents(): void {
    console.log('dd');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
    <div>
        <span class="title">${this.contents.title}</span>
        <span class="refresh-icon"></span>
    </div>
    <span class="capital-info">${this.contents?.account}원</span>
    `)
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() : object {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if(oldValue.title !== newValue.title){
      this.contents.title = newValue.title
    }
    if(oldValue.account !== newValue.account){
      this.contents.account = newValue.account
    }
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
