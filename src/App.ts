// LINK components=
import PageCarousel from "./components/carousel/PageCarousel";
import PageFooter from "./components/layout/PageFooter";
import PageMenuBar from "./components/bar/PageMenuBar";
import PageHeader from "./components/layout/PageHeader";
//component example
export const renderPageHeader = () => {
    document.querySelector('.page-header')!.innerHTML = PageHeader();
};

export const renderPageFooter = async () => {
    document.querySelector('.page-footer')!.innerHTML = PageFooter();
    // document.querySelector('.page-footer')!.innerHTML = await PageHeader();
};

export const renderPageCarousel = () => {
    document.querySelector('.page-carousel')!.appendChild(PageCarousel());
};

export const renderMenuBar = () => {
    document
        .querySelector('.page-menubar')!
        .appendChild(PageMenuBar());
};