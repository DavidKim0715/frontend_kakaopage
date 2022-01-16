const renderElement = (node : string) => {
    const el = document.createElement(node)
  
    // 하위 element를 render한 후 하위에 추가해 준다.
    // 재귀 함수를 호출하도록 하여 마지막 노드까지 랜더링
    node.children.map(renderElement).forEach((element) => {
      el.appendChild(element);
    });
  
    // 생성된 Element를 반환.
    return el;
  }
  
const render = (newVdom, container) => {
    // vdom vs newVdom : diff algorithm
    // 실제로 React는 해당 포인트에서
    // 기존의 old Virtual DOM과 new Virtual DOM의 차이점을
    // 찾아서 변경된 부분만 실제 Real DOM에서 새롭게 rendering 한다.
  
    container.appendChild(renderElement(newVdom));
  }