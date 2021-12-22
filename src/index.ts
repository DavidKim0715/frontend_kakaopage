// LINK render components
import {
    renderMenuBar,
    renderPageCarousel,
    renderPageFooter,
    renderPageHeader
} from './App';

// // LINK global style
// import './style/index.css';
// import './style/global.css';

const App = async () => {
    const template = `
    <header class="hedaer"/>
    <main class="gradient">
      <section class="page-menubar"></section>
      <section class="page-carousel"></section>
    </main> 
    <footer class="page-footer"/>
  `;
    document.getElementById('App')!.innerHTML = await template;
    renderElement();
};

const renderElement = () => {
    renderPageHeader();
    renderPageFooter();
    renderPageCarousel();
    renderMenuBar();
};