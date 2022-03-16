const template = document.createElement('template');
template.innerHTML =`
<style>
    .contents-container-wrapper{
      display: flex;
      flex-direction: column;
    }
    </style>
  `

export class ContentsContainer extends HTMLElement {
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

  renderListBtn(): string {
    let btns = '';
    for (let i = 0; i < this.contents.data.length; i++) {
      btns += `
        <list-btn 
            contents='${JSON.stringify(this.contents.data[i])}'
        >
        </list-btn>
      `;
    }
    return btns;
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
    <span class="contents-container-title">${this.contents.title}</span>
    ${this.renderListBtn()}
    `)
    
    this.attachEvents();
  }

  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: object) {
    this.setAttribute('contents', newValue);
  }
  get contents() : object {
    return JSON.parse(this.getAttribute('contents') as string);
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if(oldValue?.title !== newValue.title){
      this.contents.title = newValue.title;
    }
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
