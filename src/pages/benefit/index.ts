const template = document.createElement('template');

template.innerHTML = `
    <section>
    </section>
  `;

export class BenefitPage extends HTMLElement {
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
    this.pointItems = {
      title: '페이포인트',
      account: 0,
    };
    this.cardItems = [
      {
        idx: 0,
        mainText: '(100원) 최대 99% 할인',
        subText: '오늘의 핫딜!',
        url: '',
        icon: '',
      },
      {
        idx: 1,
        mainText: '거래도 환전도 수수류 0원',
        subText: '22년 4월까지',
        url: '',
      },
      {
        idx: 2,
        mainText: '카카오페이신용카드 혜택',
        subText: '14만원 받으세요!',
        url: '',
      },
      {
        idx: 3,
        mainText: '이달의 와인 행사',
        subText: '카카오페이포인트 적립',
        url: '',
      },
      {
        idx: 4,
        mainText: '발렌타인데이 30% 할인',
        subText: '미니스톱 멤버십 혜택',
        url: '',
      },
      {
        idx: 5,
        mainText: '건강 도시락 3종 30% 할인',
        subText: '건강한 한끼',
        url: '',
      },

      // {
      //   idx: 2,
      //   mainText: '선물 결제할 땐 카카오페이신용카드',
      //   subText: '톡 선물하기 결제 시 3% 적립',
      //   url: '',
      // },
      // {
      //   idx: 3,
      //   mainText: '귀여운 페이머니카드 집사 구합니다',
      //   subText: '다양한 집사 지원 혜택',
      //   url: '',
      // },
      // {
      //   idx: 4,
      //   mainText: '1월 자동차세 연납 놓치지말고 납부샇세요',
      //   subText: '세액 공제받고 혜택받고',
      //   url: '',
      // },
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
      { idx: 0, label: '내쿠폰', url: '', icon: '' },
      { idx: 1, label: '대한민국 응원쿠폰', url: '', icon: '' },
      { idx: 2, label: '2월 깜짝 헤택', url: '', icon: '' },
    ];
    this.contentItems = {
      title: '',
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
    <point-container 
      contents='${JSON.stringify(this.pointItems)}'
    >
    </point-container>`
    );

    this.renderHTML(
      'point-container',
      'afterend',
      `<icon-card-slider
       contents='${JSON.stringify(this.cardItems)}'>
      </icon-card-slider>`
    );

    this.renderHTML(
      'icon-card-slider',
      'afterend',
      `<main-btn-container
        contents='${JSON.stringify(this.menuItems)}'
      >
        </main-btn-container>`
    );
    this.renderHTML(
      'main-btn-container',
      'afterend',
      `<banner-btn>
     </banner-btn>`
    );
    this.renderHTML(
      'banner-btn',
      'afterend',
      `<contents-container
         contents='${JSON.stringify(this.contentItems)}
      >
     </contents-container>`
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
