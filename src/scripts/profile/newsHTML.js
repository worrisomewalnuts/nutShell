const newsHTML = (newsObject) => {
    return `
        <article id="newsItem--${newsObject.id}" class="newsItem user--${newsObject.user.id}">
            <h3>${newsObject.news}</h3>
            <div>${newsObject.date}</div>
            <div>${newsObject.newsSynopsis}</div>
            <a href="${newsObject.newsURL}">Read Article</a>
            <div>Posted By: ${newsObject.user.userName}</div>
            <button id="deleteNews--${newsObject.id}">Delete</button>
            <button id="editNews--${newsObject.id}">Edit</button>
        </article>
    `
}

export default newsHTML