export class CardSlider extends HTMLElement {
  /*
  * variables
  */
  items = [
    { idx : 0, mainText: "호랑이 기운 받아가세요", subText:"올해도 잘 부탁해", url:'../static/media/logo.png'},
    { idx : 1, mainText: "주식 수수료 0원으로 만나세요", subText:"22년 4월까지", url:''},
    { idx : 2, mainText: "선물 결제할 땐 카카오페이신용카드", subText:"톡 선물하기 결제 시 3% 적립", url:''},
    { idx : 3, mainText: "귀여운 페이머니카드 집사 구합니다", subText:"다양한 집사 지원 혜택", url:''},
    { idx : 4, mainText: "1월 자동차세 연납 놓치지말고 납부샇세요", subText:"세액 공제받고 혜택받고", url:''},
    { idx : 5, mainText: "새해 재테크 시작은 내 자산부터 관리하기", subText:"금융자산 모으고 혜택까지 받기", url:''},
    { idx : 6, mainText: "돈 되는 송금 습관 시작해 보세요", subText:"송금도 역시 카카오페이", url:''},

  ]
  /*
  * constructor
  */
  constructor() { 
    super() // 초기화
    this.bind(this)
  }


  static get observedAttributes() { 
    return ['items'] 
  }
 /*
  * Methods
  */
renderCard():string{
    const cards = ``
    for(let i = 0; i < this.items.length; i++){
      cards+=`
        <div class="slider-item">
          <strong>${this.items[i].mainText}</strong>
          <span>${this.items[i].subText}</span>
          <img :src=${this.items[i].url}"alt="${this.items[i].desc}"></img>
        </div>
      `
    }
    return cards
  }

  render(){
    this.bind(this)
    this.shadow = this.attachShadow({ mode: "open" }) // DOM scope 생성
    this.shadow.innerHTML=`
    <style>
    .card-slider {
          
    }
    </style>
    <article class="card-slider">
      <div class="slider">
        ${this.renderCard()}
      </div>
    </article>

    `
  }
  bind(element) {
      element.render = element.render.bind(element)
      element.renderCard =  element.renderCard.bind(element)
  }
  // set items(value : Array) {
  //   this.items = value
  // }
  
  // get items() {
  //   return this.items
  // }
  // attachEvents() {
    
  // }
   
  /*
  * life cycle
  */
  connectedCallback(){ 
    this.render()
    console.log('2::: connectedCallback')
  }
  disconnectedCallback() { 
    console.log('3::: disconnectedCallback')
  }
  attributeChangedCallback(name, oldValue, newValue) { //// called when one of attributes listed above is modified

    this.connectedCallback() //rerender
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // 거의 쓸 일 x
  }
 }
