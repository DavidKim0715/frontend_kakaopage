import routes from '../router/routes'
import Navbar from '../components/core/bars/NavBar.ts'
import Bottombar '../components/core/bars/Bottombar.ts'

const router = async () =>{
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render()
    await Navbar.after_render()
    footer.innerHTML = await Bottombar.render()
    await Bottombar.after_render()


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
