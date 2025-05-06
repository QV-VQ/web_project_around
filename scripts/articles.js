let articlesContent = [{
    articleTitle: "Stuttgart",
    imageUrl: "./images/stuttgart.webp",
    imageAlt: "Image of a beautiful hill in Stuttgart Germany",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, {
    articleTitle: "Berlin",
    imageUrl: "./images/berlin.webp",
    imageAlt: "Image of the Berlin arches",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, {
    articleTitle: "Nagoyan",
    imageUrl: "./images/nagoyan.webp",
    imageAlt: "Immage of a cherry blosom near a temple in Nagoyan",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, {
    articleTitle: "Japan",
    imageUrl: "./images/japan.webp",
    imageAlt: "Image of Tokyo Japan",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, {
    articleTitle: "Chichenitza",
    imageUrl: "./images/chichenitza.webp",
    imageAlt: "Image of main piramid in Chichenitz",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, {
    articleTitle: "CDMX",
    imageUrl: "./images/cdmx.webp",
    imageAlt: "Image of Bellas Artes palace in downtown Mevico city",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
}, ];
const baseArticleHTML = (article) => {
    return `
  <article class="card articles__card">
    <picture class="card__picture">
      <img src="${article.imageUrl}" alt="${article.imageAlt}" class="card__image">
    </picture>
    <div class="card__place-info">
      <h3 class="card__place-title">${article.articleTitle}</h3>
      <div class="card__icon-container">
        <img src="${article.iconUrl}" alt="like icon" data-isLiked=${article.isLiked} class="card__like-icon">
      </div>
    </div>
  </article>
`;
};
const articles = document.querySelector("#articles");
articlesContent.forEach((article) => {
    articles.insertAdjacentHTML("beforeend", baseArticleHTML(article));
});
articles.addEventListener("click", (event) => {
    const iconClicked = event.target;
    const isLikedIcon = "true" === iconClicked.getAttribute("data-isliked");
    console.log(isLikedIcon);
    if (isLikedIcon) {
        iconClicked.setAttribute("src", "./images/heart.svg");
        iconClicked.setAttribute("data-isLiked", "false");
    } else {
        iconClicked.setAttribute("src", "./images/heart-liked.svg");
        iconClicked.setAttribute("data-isLiked", "true");
    }
});