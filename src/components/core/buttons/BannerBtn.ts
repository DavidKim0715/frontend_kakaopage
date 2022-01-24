export class BannerBtn extends HTMLElement {
  /*
  * constructor
  */
  label  = ''
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
