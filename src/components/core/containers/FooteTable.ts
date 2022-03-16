const template = document.createElement('template');
template.innerHTML =`
<style>
    .detail {
      list-style:none;
      display : none;
    }
    .active{
      display : block;
    }
    </style>
`

export class FooterTable extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('link-arrow-btn')
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
    return [];
  }

  /*
   * Methods
   */

  init(): void{
    // this.node.id ="footer-btn"
    this.node.title = '(주)카카오페이 사업자 정보'
    this.shadowRoot?.appendChild(this.node)
  }

  onClickBtn(e : Event){
    if(e.target.tagName === `LINK-ARROW-BTN`){
      const ul = e.target.querySelector('.detail')
      if(ul?.classList.contains('active')){
        ul?.classList.remove('active');
      }else{
        ul?.classList.add('active');
      }
    }
  }
  attachEvents() {
    this.node.addEventListener('click', this.onClickBtn)
  }

  /*
   * life cycle
   */

  renderStaticTable(): string {
    return `
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
        `;
  }
  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin', this.renderStaticTable())
    this.attachEvents();
  }
  disconnectedCallback() {
    this.node.removeEventListener('click', this.onClickBtn)
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    //// called when one of attributes listed above is modified
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
