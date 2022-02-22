const template = document.createElement('template');
template.innerHTML = `
    <style>
    .detail {
      list-style:none;
      display : none;
      
    }
    .active{
      display : block;
    }
    </style>
    <text-btn id="footer-btn" title='(주)카카오페이 사업자 정보'>
    </text-btn>
  `;

export class FooterTable extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화

    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderHTML('text-btn', 'afterend', this.renderStaticTable());
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
    return [];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position as InsertPosition, element);
  }

  /*
   * Methods
   */

  attachEvents() {
    const btn = this.shadowRoot.querySelector('text-btn');
    const table = this.shadowRoot.querySelector('.detail');
    btn.addEventListener('click', () => {
      if (table.classList.contains('active')) {
        table.classList.remove('active');
      } else {
        table.classList.add('active');
      }
    });
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
    // this.getContentsProps();
    this.attachEvents();
  }
  disconnectedCallback() {
    console.log('3::: disconnectedCallback');
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
