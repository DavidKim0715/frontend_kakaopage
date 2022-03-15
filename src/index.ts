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

//전역 객체 지역 변수 화
const win = window
const doc = document; 

win.customElements.define('page-header', PageHeader);
win.customElements.define('main-tab', MainTab);
win.customElements.define('tab-nav', TabNav);
win.customElements.define('main-contents-container', MainContentsContainer);
win.customElements.define('home-page', HomePage);
win.customElements.define('capital-page', CapitalPage);
win.customElements.define('benefit-page', BenefitPage);
win.customElements.define('quick-menu-page', QuickMenuPage);
win.customElements.define('account-container', AccountContainer);
win.customElements.define('capital-container', CapitalContainer);
win.customElements.define('menu-container', MenuContainer);
win.customElements.define('modal-container', ModalContainer);
win.customElements.define('contents-container', ContentsContainer);
win.customElements.define('point-container', PointContainer);
win.customElements.define('card-slider', CardSlider);
win.customElements.define('icon-card-slider', IconCardSlider);
win.customElements.define('main-btn-container', MainBtnContainer);
win.customElements.define('text-btn', TextBtn);
win.customElements.define('link-arrow-btn', LinkArrowBtn);
win.customElements.define('banner-btn', BannerBtn);
win.customElements.define('icon-btn', IconBtn);
win.customElements.define('menu-btn', MenuBtn);
win.customElements.define('list-btn', ListBtn);
win.customElements.define('page-footer', PageFooter);
win.customElements.define('footer-link', FooterLink);
win.customElements.define('footer-table', FooterTable);

//rendering optimization
const header = doc.createElement('page-header');
const mainTab = doc.createElement('main-tab');
const footer = doc.createElement('page-footer');
const app = doc.getElementById('app');
app!.style.overflow = 'hidden';

const fragments = doc.createDocumentFragment(); //append 최소화

fragments?.appendChild(header);
fragments?.appendChild(mainTab);
fragments?.appendChild(footer);

app?.appendChild(fragments);
