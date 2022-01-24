export class MainTab extends HTMLElement {
    //return attributes in setup method
    static get observedAttributes() { // browser calls this method when the element is removed from the document
      return ['selected-index'] 
    }
    #selectedIndex = 0
    constructor() {
        super()
        this.bind(this)
    }
    bind(element) {
        element.render = element.render.bind(element)
        element.attachEvents = element.attachEvents.bind(element)
        element.cacheDom = element.cacheDom.bind(element)
        element.onTabClick = element.onTabClick.bind(element)
        element.selectTabIndex = element.selectTabIndex.bind(element)
        element.onContentSlotChange = element.onContentSlotChange.bind(element)
        element.onTabSlotChange = element.onTabSlotChange.bind(element)
    }
    set selectedIndex(value) {
        this.#selectedIndex = value
    }
    get selectedIndex() {
        return this.#selectedIndex
    }
    connectedCallback():void{
        this.render()
        this.cacheDom()
        this.attachEvents()
        this.dom.tabs[this.#selectedIndex]?.classList.add("selected")
        this.dom.contents[this.#selectedIndex]?.classList.add("selected")
    }
    disconnectedCallback() { 
        this.dom.tabSlot.removeEventListener("click", this.onTabClick)
        this.dom.tabSlot.removeEventListener("slotchange", this.onTabSlotChange)
        this.dom.contentSlot.removeEventListener("slotchange", this.onContentSlotChange)
        console.log('event is removed')
    }
    render() {
        this.shadow = this.attachShadow({ mode: "open" })
        this.shadow.innerHTML = `
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
            <slot id="tab-slot" name="tab"></slot>
          </div>
          <section class="tab-contents">
             <slot id="content-slot" name="content"></slot>
          </section>
        </main>
    `
    }
    cacheDom() {
        this.dom = {
            tabSlot: this.shadow.querySelector("#tab-slot"),
            contentSlot: this.shadow.querySelector("#content-slot")
        }
        this.dom.tabs = this.dom.tabSlot.assignedElements()
        this.dom.contents = this.dom.contentSlot.assignedElements()
    }
    attachEvents() {
        this.dom.tabSlot.addEventListener("click", this.onTabClick)
        this.dom.tabSlot.addEventListener("slotchange", this.onTabSlotChange)
        this.dom.contentSlot.addEventListener("slotchange", this.onContentSlotChange)
    }
    onTabSlotChange(){
        this.dom.tabs = this.dom.tabSlot.assignedElements()
    }
    onContentSlotChange(){
        this.dom.contents = this.dom.contentSlot.assignedElements()
    }
    onTabClick(e) {
        const target = e.target;
        if (target.slot === "tab") {
            const tabIndex = this.dom.tabs.indexOf(target)
            this.selectTabIndex(tabIndex)
        }
    }
    selectTabIndex(index) {
        const tab = this.dom.tabs[index]
        const content = this.dom.contents[index]
        if (!tab || !content) {
          throw new Error("null contents");
        }
        for(let i = 0; i < this.dom.tabs.length; i++){
          if(this.dom.contents[i].classList.contains('selected')){
            this.dom.contents[i].classList.remove("selected")
            this.dom.tabs[i].classList.remove("selected")
            break
          }
        }
        content.classList.add("selected");
        tab.classList.add("selected");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === "selected-index") {
            this.selectedIndex = newValue;
        }
    }
}
