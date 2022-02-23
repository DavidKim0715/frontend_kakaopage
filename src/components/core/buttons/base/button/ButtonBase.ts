const template = document.createElement('template');
template.innerHTML = `
    <style>
    .button-base-ripple{

    }
    </style>
    <button class='button-base-ripple'>
    </button>
  `;

export class ButtonBase extends HTMLElement {
  textTitle = '';
  /*
   * constructor
   */
  constructor() {
    super(); // 초기화
    this.attachShadow({ mode: 'open' }); // DOM scope 생성
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
  /*
   * variables
   */

  static get observedAttributes() {
    return [
      //   'type',
      //   'autofocus',
      //   'form',
      //   'formaction',
      //   'formenctype',
      //   'formmethod',
      //   'formnovalidate',
      //   'formtarget',
      //   'name',
      //   'value',
    ];
  }

  /*
   * Methods
   */

  attachEvents(): void {
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

  //   set formaction(newValue: string) {
  //     this.setAttribute('formaction', newValue);
  //   }
  //   get formaction(): string {
  //     return this.getAttribute('formaction');
  //   }

  //   set disabled(newValue: boolean) {
  //     this.setAttribute('disabled', newValue);
  //   }
  //   get disabled(): boolean {
  //     return this.getAttribute('disabled');
  //   }

  //   set autofocus(newValue: boolean) {
  //     this.setAttribute('autofocus', newValue);
  //   }
  //   get autofocus(): boolean {
  //     return this.getAttribute('autofocus');
  //   }

  //   set name(newValue: string) {
  //     this.setAttribute('name', newValue);
  //   }
  //   get name(): string {
  //     return this.getAttribute('name');
  //   }

  //   set formtarget(newValue: string) {
  //     this.setAttribute('formtarget', newValue);
  //   }
  //   get formtarget(): string {
  //     return this.getAttribute('formtarget');
  //   }

  //   set formnovalidate(newValue: string) {
  //     this.setAttribute('formnovalidate ', newValue);
  //   }
  //   get formnovalidate(): string {
  //     return this.getAttribute('formnovalidate ');
  //   }
  //   set formmethod(newValue: string) {
  //     this.setAttribute('formmethod', newValue);
  //   }
  //   get formmethod(): string {
  //     return this.getAttribute('formmethod');
  //   }
  //   set value(newValue: any) {
  //     this.setAttribute('value', newValue);
  //   }
  //   get value(): any {
  //     return this.getAttribute('value');
  //   }
  //   set type(newValue: string) {
  //     this.setAttribute('type', newValue);
  //   }
  //   get type(): string {
  //     return this.getAttribute('type');
  //   }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // this.connectedCallback(); //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
}
