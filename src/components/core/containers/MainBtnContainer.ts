export class MainBtnContainer extends HTMLElement {
  /*
  * constructor
  */
  items = [
    { idx : 0, label: '결제', url:'../static/media/logo.png'},
    { idx : 1, label: '주식',  url:''},
    { idx : 2, label: '신용조회', url:''},
    { idx : 3, label: '대출',url:''},
    { idx : 4, label: '투자',url:''},
    { idx : 5, label: '실비청구',url:''},
    { idx : 6, label: '내문서함',url:''},
    { idx : 7, label: '페이카드',url:''},
  ]
  constructor() { 
    super() // 초기화
    this.bind(this)
  }
  /*
  * variables
  */

  static get observedAttributes() { 
    return [] 
  }
 /*
  * Methods
  */
    buttonRender(){
      const btn = ``
      for(let i = 0; i < this.items.length; i++){
        btn+=`
          <a href="" class="ripple">
            <i></i>
            <span>${this.items[i].label}</span>
          </a>
        `
      }
      return btn
    }
    bind(element) {
        element.render = element.render.bind(element)
        // element.addEvent = element.addEvent.bind(element)
    }
    render(){
        this.shadow = this.attachShadow({ mode: "open" }) // DOM scope 생성
        this.shadow.innerHTML=`
        <article class="main-btn-tab">
          ${this.buttonRender()}
        </article>
        `
    }
    // addEvent():void{
    //     const collection = this.shadow.host.shadowRoot.querySelectorAll('a')
    //     console.log(collection,'<><<<<<<')
    // }
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
