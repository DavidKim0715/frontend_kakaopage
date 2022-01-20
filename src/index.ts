import './static/scss/_main.scss';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'; //chrome에서 업로드하기 위해 꼭 필요
import { PageHeader } from './components/core/layout/PageHeader';
import { PageFooter } from './components/core/layout/PageFooter';
import { FooterLink } from './components/core/bars/FooterLink';
import { HomePage } from './pages/home/index';
import { MainTab } from './components/tabs/MainTab';

const app = document.getElementById('app')

window.customElements.define('page-header', PageHeader)
window.customElements.define('main-tab', MainTab)
window.customElements.define('home-page', HomePage)


window.customElements.define('page-footer', PageFooter)
window.customElements.define('footer-link', FooterLink)

const header = document.createElement('page-header')
const main = document.createElement('main-tab')
const footer = document.createElement('page-footer')


main.innerHTML=`
    <h1 slot="tab">홈</h1>
    <p slot="content">
        <home-page>
        </home-page>
    </p>
    <h1 slot="tab">자산</h1>
   <p slot="content">Content B</p>
   <h1 slot="tab">혜택</h1>
   <p slot="content">Content C</p>
    <h1 slot="tab">전체</h1>
   <p slot="content">Content D</p>
`
app?.appendChild(header)
app?.appendChild(main)
app?.appendChild(footer)
