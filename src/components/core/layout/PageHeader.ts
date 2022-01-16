const template = document.createElement('template') 
template.innerHTML=`
<header class=''>
  <h1>
    dddd
  </h1>
</header>
`
export class PageHeader extends HTMLElement {
  /*
  * constructor
  */
  constructor() { 
    super() // 초기화
    this.attachShadow({mode: 'open'})// DOM scope 생성
    // this.render()
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
  }
  /*
  * variables
  */

  //return attributes in setup method
  static get observedAttributes() { // browser calls this method when the element is removed from the document
    return [] 
  }
 /*
  * Methods
  */
  // render(){
  //   template.innerHTML = `
   
  //   `
  // }
  /*
  * life cycle
  */
  connectedCallback() { // onload = created => event

    // this.shadowRoot.querySelector('#toggle-info').
    // addEventListener('click',()=>this.toggleInfo())
    console.log('2::: connectedCallback')

  }
  disconnectedCallback() { // unmounted => remove binding
     // this.shadowRoot.querySelector('#toggle-info').
    // removeEventListener('click',()=>this.toggleInfo())
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
window.customElements.define('page-header', PageHeader)
