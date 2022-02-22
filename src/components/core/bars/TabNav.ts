const template = document.createElement('template');
template.innerHTML = `
    <style>
    .tab-nav-btn{
    }
    .selected{
      border-bottom: 2px solid black;
    }
    </style>
    <nav class='tab-nav-wrapper'>
    </nav>
  `;

export class TabNav extends HTMLElement {
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.renderHTML('.tab-nav-wrapper', 'afterbegin', this.renderButton());
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return ['contents'];
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data?.insertAdjacentHTML(position as InsertPosition, element);
  }
  renderButton(): string {
    let btns = ``;
    const len = this.contents.length;
    for (let i = 0; i < len; i++) {
      const data = this.contents[i];
      const idx = this.contents[i].index;
      const content = JSON.stringify(data.data);
      btns += `
            <menu-btn
              class='tab-nav-btn' 
              content='${content}'
              index=${idx}
              >
            </menu-btn>
          `;
    }
    return btns;
  }

  /*
   * Methods
   */

  attachEvents(): void {
    const len = this.tabSlot.length;
    for (let i = 0; i < len; i++) {
      this.tabSlot[i].addEventListener('click', (e: Event) => {
        const target = e.target;
        for (let i = 0; i < len; i++) {
          if (this.tabSlot[i].classList.contains('selected')) {
            // this.dom.contents[i].classList.remove('selected');
            this.tabSlot[i].classList.remove('selected');
            break;
          }
        }
        target.classList.add('selected');
        this.dispatchEvent(new CustomEvent('selectedIndex', { detail: i })); //emit tabIndex
      });
    }
    //이벤트 리스터 등록
  }

  /*
   * life cycle
   */

  connectedCallback() {
    this.tabSlot = this.shadowRoot?.querySelectorAll('.tab-nav-btn');
    this.tabSlot[0].classList.add('selected'); //초기 인덱스 세팅
    this.attachEvents();
  }
  disconnectedCallback() {
    const len = this.tabSlot.length;
    for (let i = 0; i < len; i++) {
      this.tabSlot[i].removeEventListener('click', () => {
        const target = e.target;
        for (let i = 0; i < len; i++) {
          if (this.tabSlot[i].classList.contains('selected')) {
            // this.dom.contents[i].classList.remove('selected');
            this.tabSlot[i].classList.remove('selected');
            break;
          }
        }
        target.classList.add('selected');
        this.dispatchEvent(new CustomEvent('selectedIndex', { detail: i }));
      });
    }
  }

  set contents(newValue: any) {
    this.setAttribute('contents', newValue);
  }
  get contents() {
    return JSON.parse(this.getAttribute('contents'));
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
