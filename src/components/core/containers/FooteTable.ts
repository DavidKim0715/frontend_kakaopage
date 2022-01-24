export class FooterTable extends HTMLElement {
  /*
  * constructor
  */
  constructor() { 
    super() // 초기화
    this.bind(this)
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
  render(){
    this.shadow = this.attachShadow({ mode: "open" }) // DOM scope 생성
    this.shadow.innerHTML=`
    <style>
    ul{
      list-style:none;
      visibility : hidden;
      &.active{
        visibility : visible;
      }
    }
    </style>
    <text-btn id="footer-btn">

    </text-btn>
    <ul class="detail">
      <li>
        <span>대표이사</span>
        <span>류영준</span>
      </li>
       <li>
        <span>주소</span>
        <span>류영준</span>
      </li>
       <li>
        <span>사업자 등록번호</span>
        <span>류영준</span>
      </li>
       <li>
        <span>통신판매업 신고번호</span>
        <span>류영준</span>
      </li>
       <li>
        <span>호스팅 사업자</span>
        <span>류영준</span>
      </li>
       <li>
        <span>고객센터</span>
        <span>류영준</span>
      </li>
    </ul>
    `
  }
  bind(element) {
        element.render = element.render.bind(element)
        element.attachEvents = element.attachEvents.bind(element)
  }
  onClickBtn(table : HTMLELEMENT):void{
    if(table.classList.contains('active')){
      table.classList.remove('active')
    }else{
      table.classList.add('active')
    }
  }

  attachEvents() {
    const btn =  this.shadow.querySelector('text-btn')
    const table =  this.shadow.querySelector('ul')
    btn.addEventListener('click', this.onClickBtn(table))
    }
  /*
  * life cycle
  */
  connectedCallback() { // onload = created => event
    this.render()
    this.attachEvents()
  }
  disconnectedCallback() { // unmounted => remove binding
  }
  attributeChangedCallback(name, oldValue, newValue) { //// called when one of attributes listed above is modified

    this.connectedCallback() //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
 }
