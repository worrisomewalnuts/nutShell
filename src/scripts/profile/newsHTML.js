const newsHTML = (newsObject, userName) => {
    return `
        <article class="newsItem user--${newsObject.userId}">
            <h3>${newsObject.news}</h3>
            <div>${newsObject.newsSynopsis}</div>
            <a href="${newsObject.newsURL}">Read Article</a>
            <div>Posted By: ${userName}</div>
        </article>
    `
}

export default newsHTML