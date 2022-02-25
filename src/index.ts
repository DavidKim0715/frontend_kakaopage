import './assets/scss/_main.scss';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'; //chrome에서 업로드하기 위해 꼭 필요
import { PageHeader } from './components/core/layout/PageHeader';
import { PageFooter } from './components/core/layout/PageFooter';
import { FooterLink } from './components/core/bars/FooterLink';
import { HomePage } from './pages/home/index';
import { BenefitPage } from './pages/benefit/index';
import { CapitalPage } from './pages/capital/index';
import { QuickMenuPage } from './pages/quick/index';
import { MainTab } from './components/tabs/MainTab';
import { TabNav } from './components/core/bars/TabNav';
import { MainContentsContainer } from './components/core/containers/MainContentsContainer';
import { TextBtn } from './components/core/buttons/TextBtn';
import { BannerBtn } from './components/core/buttons/BannerBtn';
import { MenuBtn } from './components/core/buttons/MenuBtn';
import { IconBtn } from './components/core/buttons/IconBtn';
import { ListBtn } from './components/core/buttons/ListBtn';
import { LinkArrowBtn } from './components/core/buttons/LinkArrowBtn';
import { AccountContainer } from './components/core/containers/AccountContainer';
import { CapitalContainer } from './components/core/containers/CapitalContainer';
import { PointContainer } from './components/core/containers/PointContainer';
import { ModalContainer } from './components/core/containers/ModalContainer';
import { MenuContainer } from './components/core/containers/MenuContainer';
import { CardSlider } from './components/core/carousels/CardSlider';
import { IconCardSlider } from './components/core/carousels/IconCardSlider';
import { MainBtnContainer } from './components/core/containers/MainBtnContainer';
import { ContentsContainer } from './components/core/containers/ContentsContainer';
import { FooterTable } from './components/core/containers/FooteTable';
import Ripple from './components/core/animation/Ripple';

window.customElements.define('page-header', PageHeader);
window.customElements.define('main-tab', MainTab);
window.customElements.define('tab-nav', TabNav);
window.customElements.define('main-contents-container', MainContentsContainer);
window.customElements.define('home-page', HomePage);
window.customElements.define('capital-page', CapitalPage);
window.customElements.define('benefit-page', BenefitPage);
window.customElements.define('quick-menu-page', QuickMenuPage);
window.customElements.define('account-container', AccountContainer);
window.customElements.define('capital-container', CapitalContainer);
window.customElements.define('menu-container', MenuContainer);
window.customElements.define('modal-container', ModalContainer);
window.customElements.define('contents-container', ContentsContainer);
window.customElements.define('point-container', PointContainer);
window.customElements.define('card-slider', CardSlider);
window.customElements.define('icon-card-slider', IconCardSlider);
window.customElements.define('main-btn-container', MainBtnContainer);
window.customElements.define('text-btn', TextBtn);
window.customElements.define('link-arrow-btn', LinkArrowBtn);
window.customElements.define('banner-btn', BannerBtn);
window.customElements.define('icon-btn', IconBtn);
window.customElements.define('menu-btn', MenuBtn);
window.customElements.define('list-btn', ListBtn);
window.customElements.define('page-footer', PageFooter);
window.customElements.define('footer-link', FooterLink);
window.customElements.define('footer-table', FooterTable);

//rendering optimization
const doc = window.document; //전역 객체 참조 복사

const header = doc.createElement('page-header');
const mainTab = doc.createElement('main-tab');
const footer = doc.createElement('page-footer');
const app = doc.getElementById('app');
app.style.overflow = 'hidden';

const fragments = doc.createDocumentFragment(); //append 최소화

fragments?.appendChild(header);
fragments?.appendChild(mainTab);
fragments?.appendChild(footer);

app?.appendChild(fragments);
