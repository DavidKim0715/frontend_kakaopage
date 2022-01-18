import './static/scss/_main.scss';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'; //chrome에서 업로드하기 위해 꼭 필요
import { PageHeader } from './components/core/layout/PageHeader';
import { PageFooter } from './components/core/layout/PageFooter';
// import { HeaderLayer1 } from './components/core/bars/HeaderLayer1';
// import { FooterLayer1 } from './components/core/bars/FooterLayer1';
import { MainTab } from './components/tabs/MainTab';

const app = document.getElementById('app')

window.customElements.define('page-header', PageHeader)
window.customElements.define('page-footer', PageFooter)
window.customElements.define('main-tab', MainTab)

const header = document.createElement('page-header')
const main = document.createElement('main-tab')
const footer = document.createElement('page-footer')
main.innerHTML=`
    <h1 slot="tab">Tab A</h1>
    <p slot="content">Content A</p>
    <h1 slot="tab">Tab B</h1>
   <p slot="content">Content B</p>
   <h1 slot="tab">Tab C</h1>
   <p slot="content">Content C</p>
    <h1 slot="tab">Tab D</h1>
   <p slot="content">Content D</p>
`
app?.appendChild(header)
app?.appendChild(main)
app?.appendChild(footer)
