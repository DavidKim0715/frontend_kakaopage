const template = document.createElement('template');
template.innerHTML =`
<style></style>
`

export class FooterLink extends HTMLElement {
  private doc = document
  private node  = this.doc.createElement('nav')

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

  init():void{
    this.node.classList.add('footer-link-wrapper')
  } 

  renderBtn(): string {
    let btn = ``;
    for (let i = 0; i < this.contents.length; i++) {
      btn += `
          <a href="${this.contents[i].url}" class="ripple">
            <span>${this.contents[i].text}</span>
          </a>
        `;
    }
    return btn;
  }
 

  attachEvents(): void {
    console.log('메인 버튼 탭 이벤트 등록');

    //이벤트 리스터 등록
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  
  get contents() :object {
    return JSON.parse(this.getAttribute('contents') as string);
  }
  /*
   * life cycle
   */


  connectedCallback() {
    this.node.insertAdjacentHTML('afterbegin', this.renderBtn())
    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }



  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
