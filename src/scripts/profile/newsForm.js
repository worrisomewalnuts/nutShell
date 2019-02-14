const newsForm = () => {
    return `
    <h4>Add News Item</h4>
    <section id="newsForm">
    <label>Title: </label>
    <input type="text" id="newsTitle"></input>
    <label>Date: </label>
    <input type="text" id="newsDate"></input>
    <label>Synopsis: </label>
    <input type="text" id="newsSynopsis"></input>
    <button id="submitNews">Submit</button>
    </section>
    `
}

export default newsForm