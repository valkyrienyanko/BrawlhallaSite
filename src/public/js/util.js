function redirectHome() {
  window.history.back()
}

function createElement(type, content) {
    const theElement = document.createElement(type)
    const theElementText = document.createTextNode(content)
    theElement.appendChild(theElementText)
    document.body.appendChild(theElement)
    return theElement;
}