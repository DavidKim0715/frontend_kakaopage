import './static/scss/_main.scss';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'; //chrome에서 업로드하기 위해 꼭 필요
import { PageHeader } from './components/core/layout/PageHeader';
import { PageFooter } from './components/core/layout/PageFooter';
import { FooterLink } from './components/core/bars/FooterLink';

import { HomePage } from './pages/home/index';
import { QuickMenuPage } from './pages/quick/index';

import { MainTab } from './components/tabs/MainTab';
import { TextBtn } from './components/core/buttons/TextBtn';
import { BannerBtn } from './components/core/buttons/BannerBtn';
import { MenuBtn } from './components/core/buttons/MenuBtn';
import { IconBtn } from './components/core/buttons/IconBtn';
import { AccountContainer } from './components/core/containers/AccountContainer';
import { MenuContainer } from './components/core/containers/MenuContainer';
import { CardSlider } from './components/core/carousels/CardSlider';
import { MainBtnContainer } from './components/core/containers/MainBtnContainer';
import Ripple from './components/core/animation/Ripple';
import { FooterTable } from './components/core/containers/FooteTable';

const app = document.getElementById('app');

window.customElements.define('page-header', PageHeader);
window.customElements.define('main-tab', MainTab);
window.customElements.define('home-page', HomePage);
window.customElements.define('quick-menu-page', QuickMenuPage);

window.customElements.define('account-container', AccountContainer);
window.customElements.define('menu-container', MenuContainer);

window.customElements.define('card-slider', CardSlider);

window.customElements.define('main-btn-container', MainBtnContainer);
window.customElements.define('text-btn', TextBtn);
window.customElements.define('banner-btn', BannerBtn);
window.customElements.define('icon-btn', IconBtn);
window.customElements.define('menu-btn', MenuBtn);

window.customElements.define('page-footer', PageFooter);
window.customElements.define('footer-link', FooterLink);
window.customElements.define('footer-table', FooterTable);

const header = document.createElement('page-header');
const mainTab = document.createElement('main-tab');
const footer = document.createElement('page-footer');

mainTab.innerHTML = `
    <h1 slot="tab">홈</h1>
    <p slot="content">
        <home-page></home-page>
    </p>
    <h1 slot="tab">자산</h1>
   <p slot="content">Content B</p>
   <h1 slot="tab">혜택</h1>
   <p slot="content">Content C</p>
    <h1 slot="tab">전체</h1>
   <p slot="content">
        <quick-menu-page></quick-menu-page>
    </p>
`;
app?.appendChild(header);
app?.appendChild(mainTab);
app?.appendChild(footer);
