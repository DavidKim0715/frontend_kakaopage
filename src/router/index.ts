import routes from '../router/routes'

const navigateTo = (url : string) => {
    history.pushState(null, '', url)
    router()
}

const router = async () => {

}

window.addEventListener("popstate", router)
//onload <- DOM 생성 이후 실행
//DOMContentLoaded <- onload보다 빠르게 실행됨(HTML - SCRIPT 사이)
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {

    })

    router()
})
