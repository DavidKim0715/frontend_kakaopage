const template = document.createElement('template');

template.innerHTML = `
    <section>
    </section>
  `;

export class HomePage extends HTMLElement {
  cardItems = [];
  accountItems = [];
  menuItmes = [];
  contentItems = [];
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.accountItems = {
      title: '카카오페이머니',
      account: 0,
      button: [
        { text: '충전', url: '' },
        { text: '송금', url: '' },
      ],
    };
    this.cardItems = [
      {
        idx: 0,
        mainText: '내가 찾던 대출한도, 여기 다 모여 있다!',
        subText: '50개 금융사 비교를 한 번에!',
        image: '',
        url: '',
      },
      {
        idx: 1,
        mainText: '혜택 올★픽엔 실격이 없어요',
        subText: '공정한 동계 이벤트',
        image: '',
        url: '',
      },
      {
        idx: 2,
        mainText: '선물 결제할 땐 카카오페이신용카드',
        subText: '톡 선물하기 결제 시 3% 적립',
        image: '',
        url: '',
      },
      {
        idx: 3,
        mainText: '귀여운 페이머니카드 집사 구합니다',
        subText: '다양한 집사 지원 혜택',
        image: '',
        url: '',
      },
      {
        idx: 4,
        mainText: '1월 자동차세 연납 놓치지말고 납부샇세요',
        subText: '세액 공제받고 혜택받고',
        image: '',
        url: '',
      },
      {
        idx: 5,
        mainText: '1월 자동차세 연납 놓치지말고 납부샇세요',
        subText: '세액 공제받고 혜택받고',
        image: '',
        url: '',
      },
      // {
      //   idx: 5,
      //   mainText: '새해 재테크 시작은 내 자산부터 관리하기',
      //   subText: '금융자산 모으고 혜택까지 받기',
      //   url: '',
      // },
      // {
      //   idx: 6,
      //   mainText: '돈 되는 송금 습관 시작해 보세요',
      //   subText: '송금도 역시 카카오페이',
      //   url: '',
      // },
    ];
    this.menuItems = [
      { idx: 0, label: '결제', url: '', icon: '' },
      { idx: 1, label: '주식', url: '', icon: '' },
      { idx: 2, label: '신용조회', url: '', icon: '' },
      { idx: 3, label: '대출', url: '', icon: '' },
      { idx: 4, label: '투자', url: '', icon: '' },
      { idx: 5, label: '실비청구', url: '', icon: '' },
      { idx: 6, label: '내문서함', url: '', icon: '' },
      { idx: 7, label: '페이카드', url: '', icon: '' },
    ];
    this.contentItems = {
      title: '세계인의 축제에 무슨 일이?',
      data: [
        {
          idx: 0,
          text: '국제대회의 경제적 효과',
          subText: '무리해서 진행하는 이휴',
          icon: '',
          url: '',
        },
        {
          idx: 1,
          text: '세계 최초 CBDC?',
          subText: '꾸준히 준비했다던데',
          icon: '',
          url: '',
        },
        {
          idx: 2,
          text: '정말 화폐체계가 바뀔까',
          subText: '세계 각국의 자세',
          icon: '',
          url: '',
        },
      ],
    };
    this.renderHTML(
      'section',
      'afterbegin',
      `
    <account-container 
      contents='${JSON.stringify(this.accountItems)}'
    >
    </account-container>`
    );
    this.renderHTML(
      'account-container',
      'afterend',
      `<main-btn-container 
       contents='${JSON.stringify(this.menuItems)}'>
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
      `<contents-container
        contents='${JSON.stringify(this.contentItems)}'
      >
    </contents-container>`
    );
    this.renderHTML(
      'contents-container',
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
