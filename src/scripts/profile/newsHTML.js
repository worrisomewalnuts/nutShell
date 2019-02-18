const newsHTML = (newsObject) => {
    return `
        <article id="newsItem--${newsObject.id}" class="newsItem friendItem user--${newsObject.user.id}">
            <h3 id="newsTitle--${newsObject.id}">${newsObject.news}</h3>
            <div>${newsObject.date}</div>
            <div id="newsSynopsis--${newsObject.id}">${newsObject.newsSynopsis}</div>
            <a href="${newsObject.newsURL}" id="newsLink--${newsObject.id}">Read Article</a>
            <div>Posted By: ${newsObject.user.userName}</div>
            <button id="deleteNews--${newsObject.id}">Delete</button>
            <button id="editNewsButton--${newsObject.id}">Edit</button>
        </article>
    `
}

export default newsHTML