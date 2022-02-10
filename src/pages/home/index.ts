const template = document.createElement('template');

template.innerHTML = `
    <section>
    </section>
  `;

export class HomePage extends HTMLElement {
  cardItems = [];
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.cardItems = [
      {
        idx: 0,
        mainText: '호랑이 기운 받아가세요',
        subText: '올해도 잘 부탁해',
        url: '../static/media/logo.png',
      },
      {
        idx: 1,
        mainText: '주식 수수료 0원으로 만나세요',
        subText: '22년 4월까지',
        url: '',
      },
      {
        idx: 2,
        mainText: '선물 결제할 땐 카카오페이신용카드',
        subText: '톡 선물하기 결제 시 3% 적립',
        url: '',
      },
      {
        idx: 3,
        mainText: '귀여운 페이머니카드 집사 구합니다',
        subText: '다양한 집사 지원 혜택',
        url: '',
      },
      {
        idx: 4,
        mainText: '1월 자동차세 연납 놓치지말고 납부샇세요',
        subText: '세액 공제받고 혜택받고',
        url: '',
      },
      {
        idx: 5,
        mainText: '새해 재테크 시작은 내 자산부터 관리하기',
        subText: '금융자산 모으고 혜택까지 받기',
        url: '',
      },
      {
        idx: 6,
        mainText: '돈 되는 송금 습관 시작해 보세요',
        subText: '송금도 역시 카카오페이',
        url: '',
      },
    ];
    this.renderHTML(
      'section',
      'afterbegin',
      `
    <account-container>
    </account-container>`
    );
    this.renderHTML(
      'account-container',
      'afterend',
      `<main-btn-container>
    </main-btn-container>`
    );
    this.renderHTML(
      'main-btn-container',
      'afterend',
      `<card-slider
        contents='${JSON.stringify(this.cardItems)}'
      >
    </card-slider>`
    );
    this.renderHTML(
      'card-slider',
      'afterend',
      `<banner-btn>
     </banner-btn>`
    );
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
    return [''];
  }

  /*
   * Methods
   */

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position, element);
  }
  attachEvents(): void {
    console.log('hompage 이벤트 등록');
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
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
