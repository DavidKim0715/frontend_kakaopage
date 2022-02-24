const template = document.createElement('template');
template.innerHTML = `
    <style>
      @media (min-width: 1080px) {
      .quick-menu-page-wrapper{
        width: 1080px;
      }
    }
    </style>
    <section class="quick-menu-page-wrapper">
    </section>
    `;

export class QuickMenuPage extends HTMLElement {
  contents = [];
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.contents = [
      {
        index: '0',
        title: '비밀번호 결제수단 고객센터',
        data: [{ name: '설정', url: '', spec: '' }],
      },
      {
        index: 1,
        title: '자산관리',
        data: [
          { name: '통합내역', url: '', spec: '' },
          { name: '신용조회', url: '', spec: '' },
          { name: '내 차 관리', url: '', spec: '' },
          { name: '공모주 알리미', url: '', spec: '' },
        ],
      },
      {
        index: 2,
        title: '보험',
        data: [
          { name: '병원비 청구', url: '', spec: '' },
          { name: '자동차보험', url: '', spec: '' },
          { name: '전세반환보증', url: '', spec: '' },
          { name: '보험상품', url: '', spec: '' },
        ],
      },
      {
        index: 3,
        title: '대출',
        data: [
          { name: '대출비교', url: '', spec: '' },
          { name: '내 대출 한도', url: '', spec: '' },
          { name: '카드대출', url: '', spec: '' },
          { name: '버팀목 전세자금대출', url: '', spec: '' },
          { name: '대출이자 계산기', url: '', spec: '' },
        ],
      },
      {
        index: 4,
        title: '전자문서',
        data: [
          { name: '내문서함', url: '', spec: '' },
          { name: '인증', url: '', spec: '' },
          { name: '청구서', url: '', spec: '' },
          { name: '영수증', url: '', spec: '' },
        ],
      },
      {
        index: 5,
        title: '송금',
        data: [
          { name: '송금', url: '', spec: '' },
          { name: '예약송금', url: '', spec: '' },
          { name: '1/N 정산하기', url: '', spec: '' },
          { name: '정산 현황', url: '', spec: '' },
          { name: '사다리타기', url: '', spec: '' },
          { name: '송금코드', url: '', spec: '' },
        ],
      },
      {
        index: 6,
        title: '결제',
        data: [
          { name: '결제', url: '', spec: '' },
          { name: '멤버십', url: '', spec: '' },
          { name: '페이카드', url: '', spec: '' },
          { name: '페이상품권', url: '', spec: '' },
          { name: '모바일 교통카드', url: '', spec: '' },
          { name: '이벤트', url: '', spec: '' },
        ],
      },
      {
        index: 7,
        title: '카카오페이증권',
        data: [
          { name: '투자매니저', url: '', spec: 'new' },
          { name: '증권계자', url: '' },
          { name: '주식', url: 'new' },
          { name: '동전 모으기', url: '' },
          { name: '펀드', url: '' },
          { name: '버킷리스트', url: '' },
          { name: '미니금고', url: '' },
        ],
      },
      {
        index: 8,
        title: '제휴서비스',
        data: [
          { name: 'ATM출금', url: '', spec: '' },
          { name: '금융제휴', url: '' },
          { name: '배송', url: '' },
          { name: '환전(하나은행)', url: '' },
          { name: '스마트폰(KT)', url: '' },
          { name: '온라인 연계투자 현황', url: '' },
        ],
      },
      {
        index: 9,
        title: '사장님',
        data: [
          { name: '비즈니스 앱', url: '', spec: '' },
          { name: '가맹점 신청', url: '' },
          { name: '맴버십 신청', url: '' },
        ],
      },
    ];
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML('section', 'afterbegin', this.renderMenu());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return [''];
  }
  /*
   * Methods
   */

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }
  // set contents(newValue: any) {
  //   this.setAttribute('contents', newValue);
  // }
  // get contents() {
  //   return JSON.parse(this.getAttribute('contents'));
  // }
  attachEvents(): void {
    console.log('dd');
    //이벤트 리스터 등록
  }

  renderMenu(): string {
    let menu = '';
    for (let i = 0; i < this.contents.length; i++) {
      const contents = JSON.stringify(this.contents[i].data);
      const title = this.contents[i].title;
      menu += `
        <menu-container 
          contents='${contents}'
          title='${title}'
        >
        </menu-container>
      `;
    }
    return menu;
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //// called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
