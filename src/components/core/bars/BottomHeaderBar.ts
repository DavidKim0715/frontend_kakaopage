const BottomHeaderBar = () => {
    const template = `
    <nav class="bottom-header">
        <a href="/">홈</a>
        <a href="/capital">자산</a>
        <a href="/benefit">혜택</a>
        <a href="/quick">전체</a>
    </nav>`

    document.querySelector("a")?.addEventListener("click", event => {
        // 이벤트 처리 ...
    })
    return template
}
export default BottomHeaderBar
