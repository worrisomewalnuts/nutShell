const editNewsForm = (idToEdit) => {
    let title = document.querySelector(`#newsTitle--${idToEdit}`)
    let synopsis = document.querySelector(`#newsSynopsis--${idToEdit}`)
    let url = document.querySelector(`#newsLink--${idToEdit}`)

    return `
    <h4>Edit News Item</h4>
    <section id="editNewsForm">
    <label>Edit Title: </label>
    <input type="text" id="editNewsTitle" value="${title.textContent}"></input>
    <label>Edit Synopsis: </label>
    <input type="text" id="editNewsSynopsis" value="${synopsis.textContent}"></input>
    <button id="updateNews">Update</button>
    </section>
    `
}

export default editNewsForm