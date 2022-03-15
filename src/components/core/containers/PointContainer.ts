const template = document.createElement('template');
template.insertAdjacentHTML('afterbegin', `
<style>
.point-wrapper{
  display : block;
    height : 300px;
    margin : 0 auto;
    width: 1000px;
}
.title{
    font-size: 3em;
    color : #c5c5c5;
  }
  .point-info{
    font-size: 5em;
  }
</style>
`)
export class PointContainer extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('article')
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
    this.node.classList.add('point-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

  /*
   * Methods
   */

  renderPointLink(): string {
    return `
    <span class='point-link-icon'></span>
    <span class='point-link-content'>페이포인트를 쓸 수 있는 곳은?</span>
    `;
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
      <span class="title">
        ${this.contents.title}
      </span>
      <br>
      <a class="point-info">
        ${this.contents.account}P
      </a>
      <hr>
      ${this.renderPointLink()}
    `
    )
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
    //// called when one of attributes listed above is modified
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
