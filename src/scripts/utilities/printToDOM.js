function printToDom(HTMLString, DOMLocation) {
    document.querySelector(`#${DOMLocation}`).innerHTML = HTMLString
}

export default printToDom