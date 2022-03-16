const template = document.createElement('template');
template.innerHTML =`
<style>
.account-wrapper{
  background-color: #524e67;
  border-radius: 30px;
  display : block;
  height : 300px;
  margin : 0 auto;
  width: 1000px;
}
.account-box{
  height: 100%;
  padding : 2em; 
}
.top-account{
  display: flex;
justify-content: space-between;
}
.title{
  font-size: 3em;
  color : #c5c5c5;
}
.account-info{
  font-size: 5em;
  color : #fff;
}
.bottom-account{
  display: flex;
  justify-content: flex-end;
}
</style>
`
export class AccountContainer extends HTMLElement {
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
  static get observedAttributes() {
    return ['contents'];
  }

  /*
   * Methods
   */

  init(): void{
    this.node.classList.add('account-wrapper')
    this.shadowRoot?.appendChild(this.node)
  }

  renderBtn(): string {
    let btns = '';
    for (let i = 0, btn = this.contents?.button; i < btn?.length; i++) {
      btns += `
        <text-btn 
        class='pay-btn' 
        title='${btn[i].text}'></text-btn>
      `;
    }
    return btns;
  }

  onClickBtn(e : Event): void {
    console.log(e.target,'<<<<<<<<<<<<<')
  }

  attachEvents(): void {
    this.node.addEventListener('click', this.onClickBtn)
    console.log('dd');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin',`
    <div class='account-box'>
      <div class='top-account'>
        <span class="title">${this.contents.title}</span>
        <icon-btn class="btn-collection"></icon-btn>      
      </div>
      <span class="account-info">${this.contents.account}원</span>
      <div class='bottom-account'>
        ${this.renderBtn()}
      </div>
    </div>
    `)
    this.attachEvents();
  }
  disconnectedCallback() {
    this.node.removeEventListener('click', this.onClickBtn)
    this.shadowRoot?.removeChild(this.node)
    this.node = this.doc.createElement('article')
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() :object {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // if(oldValue.title !== newValue.title){
    //   this.contents.title = newValue.title
    // }
    // if(oldValue.account !== newValue.account){
    //   this.contents.account = newValue.account
    // } 
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
