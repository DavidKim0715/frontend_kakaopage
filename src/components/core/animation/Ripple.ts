const Ripple = (element : HTMLElement, binding : any, ev : MouseEvent) => {
    const rippleElement = document.createElement('span')
    let currentDiameter = 1
    let currentOpacity = 0.5
    //디렉티브 핸들러 함수
    const animateRipple =() => {
        const maxDiameter = +binding.value || 50
        if (currentDiameter <= maxDiameter) {
          currentDiameter++
          currentOpacity -= 0.5 / maxDiameter
          rippleElement.style.transform = `scale(${currentDiameter})`
          rippleElement.style.opacity = `${currentOpacity}`
        } else {
          //애니메이션 이벤트 제거
          rippleElement.remove()
          clearInterval(animationHandler)
        }
      }
    //스타일 append 함수 
    const bindRippleStyle = ()=> {
        const position = element.getBoundingClientRect()
        const rippleStyle = rippleElement.style
        const offsetY = ev.clientY - position.y // 클릭 위치에 따른 디렉티브 동작 위치 value
        const offsetX = ev.clientX - position.x // 클릭 위치에 따른 디렉티브 동작 위치 value
        const target = ev.target as Element
  
        rippleStyle.position = 'absolute'
        rippleStyle.height = '6px'
        rippleStyle.width = '6px'
        rippleStyle.borderRadius = '100%'
        rippleStyle.backgroundColor = '#f1f2f0'
        rippleStyle.left = `${offsetX}px`
        rippleStyle.top = `${offsetY}px`
        target.appendChild(rippleElement) // 노드 추가
    }
    
    const animationHandler = setInterval(animateRipple, 6) //디렉티브 속도 제한
    bindRippleStyle()
  }
  export default Ripple