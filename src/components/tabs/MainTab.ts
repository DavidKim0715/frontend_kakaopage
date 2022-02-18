const template = document.createElement('template');
template.innerHTML = `
     <style>
          :host { display: flex; flex-direction: column; }
          :host([direction="column"]) { flex-direction: row; }
          :host([direction="column"]) .tabs { flex-direction: column; }
          .tabs { display: flex; flex-direction: row; flex-wrap: nowrap; gap: var(--tab-gap, 0px); }
                    
          .tabs ::slotted(*) { padding: 5px; border: 1px solid #ccc; user-select: none; cursor: pointer; }
          .tabs ::slotted(.selected) { background: #efefef; }
          .tab-contents ::slotted(*) { display: none; }
          .tab-contents ::slotted(.selected) { display: block; padding: 5px; }
    </style>
    <main class="main-tab-wrapper">
        <div class="tabs">
        </div>
        <section class="tab-contents">
        </section>
    </main>
    `;
//    <h1 slot="tab">홈</h1>
//     <p slot="content">
//         <home-page></home-page>
//     </p>
//     <h1 slot="tab">자산</h1>
//    <p slot="content">

//    </p>
//    <h1 slot="tab">혜택</h1>
//    <p slot="content">
//          <benefit-page></benefit-page>
//    </p>
//     <h1 slot="tab">전체</h1>
//    <p slot="content">
//         <quick-menu-page></quick-menu-page>
//     </p>
export class MainTab extends HTMLElement {
  #selectedIndex = 0;
  contents = [];
  dom = {};
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.contents = [
      { idx: 0, title: '홈', data: 'home-page' },
      { idx: 1, title: '자산', data: '' },
      { idx: 2, title: '혜택', data: 'benefit-page' },
      { idx: 3, title: '전체', data: 'quick-menu-page' },
    ];
    this.renderHTML('.tabs', 'afterbegin', this.renderTabSlot());
    this.renderHTML('.tab-contents', 'afterbegin', this.renderTabContents());
  }
  /*
   * variables
   */

  //return attributes in setup method
  static get observedAttributes() {
    // browser calls this method when the element is removed from the document
    return ['selected-index'];
  }

  private renderTabSlot(): string {
    // let h1 = '';
    // const len = this.items.length;
    // const content = this.contents;
    // for (let i = 0; i < len; i++) {
    //   h1 += `
    //         <h1 slot='tab'>${content[i].title}</h1>
    //       `;
    // }
    return `<slot id="tab-slot" name="tab"></slot>`;
  }
  private renderTabContents(): string {
    // let p = '';
    // const len = this.items.length;
    // const content = this.contents;
    // for (let i = 0; i < len; i++) {
    //   const tag = document.createElement(content[i].data);
    //   p += `
    //         <p slot="content">
    //             ${tag}
    //         </p>
    //       `;
    // }
    return `<slot id="content-slot" name="content"></slot>`;
  }
  set selectedIndex(value) {
    this.#selectedIndex = value;
  }
  get selectedIndex() {
    return this.#selectedIndex;
  }

  renderHTML(tag: string, position: string, element: string): void {
    const data = this.shadowRoot?.querySelector(tag);
    data.insertAdjacentHTML(position, element);
  }

  attachEvents(): void {
    this.dom.tabSlot.addEventListener('click', this.onTabClick);
    this.dom.tabSlot.addEventListener('slotchange', this.onTabSlotChange);
    this.dom.contentSlot.addEventListener(
      'slotchange',
      this.onContentSlotChange
    );
  }

  cacheDom(): void {
    this.dom = {
      tabSlot: this.shadowRoot.querySelector('#tab-slot'),
      contentSlot: this.shadowRoot.querySelector('#content-slot'),
    };
    this.dom.tabs = this.dom.tabSlot.assignedElements();
    this.dom.contents = this.dom.contentSlot.assignedElements();
  }

  onTabSlotChange(): void {
    this.dom.tabs = this.dom.tabSlot.assignedElements();
  }

  onContentSlotChange(): void {
    this.dom.contents = this.dom.contentSlot.assignedElements();
  }

  onTabClick(e: Event): void {
    const target = e.target;
    if (target.slot === 'tab') {
      const tabIndex = this.dom.tabs.indexOf(target);
      this.selectTabIndex(tabIndex);
    }
  }

  selectTabIndex(index: number): void {
    const tab = this.dom.tabs[index];
    const content = this.dom.contents[index];
    if (!tab || !content) {
      throw new Error('null contents');
    }
    for (let i = 0; i < this.dom.tabs.length; i++) {
      if (this.dom.contents[i].classList.contains('selected')) {
        this.dom.contents[i].classList.remove('selected');
        this.dom.tabs[i].classList.remove('selected');
        break;
      }
    }
    content.classList.add('selected');
    tab.classList.add('selected');
  }

  connectTabCotents() {
    return '';
  }
  connectTabSlot() {
    return '';
  }
  connectedCallback(): void {
    //1

    //2
    this.cacheDom();
    this.attachEvents();
    this.dom.tabs[this.#selectedIndex]?.classList.add('selected');
    this.dom.contents[this.#selectedIndex]?.classList.add('selected');
  }

  disconnectedCallback(): void {
    this.dom.tabSlot.removeEventListener('click', this.onTabClick);
    this.dom.tabSlot.removeEventListener('slotchange', this.onTabSlotChange);
    this.dom.contentSlot.removeEventListener(
      'slotchange',
      this.onContentSlotChange
    );
    console.log('event is removed');
  }

  attributeChangedCallback(name, oldValue, newValue): void {
    if (oldValue !== newValue && name === 'selected-index') {
      this.selectedIndex = newValue;
    }
  }
}
