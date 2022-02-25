const template = document.createElement('template');
template.innerHTML = `
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
    <article class='account-wrapper'>
      <div class='account-box'>
        <div class='top-account'>
          <span class="title"></span>
          <icon-btn class="btn-collection"></icon-btn>      
        </div>
        <span class="account-info"></span>
        <div class='bottom-account'></div>
      </div>
    </article>
  `;

export class AccountContainer extends HTMLElement {
  containerTitle = '' as HTMLElement;
  accountInfo = '' as HTMLElement;
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.containerTitle = this.shadowRoot?.querySelector('.title');
    this.accountInfo = this.shadowRoot?.querySelector('.account-info');
    // this.renderHTML('.account-info', 'afterbegin', this.renderInfo());
    this.renderHTML('.bottom-account', 'afterbegin', this.renderBtn());
  }
  /*
   * variables
   */
  // // 외부 스타일을 shadow dom에 적용하기
  // const linkElem = document.createElement('link');
  // linkElem.setAttribute('rel', 'stylesheet');
  // linkElem.setAttribute('href', 'style.css');

  // // 생성된 요소를 shadow dom에 부착하기
  // shadow.appendChild(linkElem);

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }

  getInfoProps(): void {
    const accountData = this.contents?.account;
    this.accountInfo.innerText = accountData + '원';
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
  /*
   * Methods
   */

  attachEvents(): void {
    console.log('dd');

    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  getTitleProps(): void {
    const titleData = this.contents?.title;
    this.containerTitle.innerText = titleData;
  }

  // getContentsProps(): void {
  //   const contentsData
  // }

  connectedCallback() {
    this.getTitleProps();
    this.getInfoProps();
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
