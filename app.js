
let searchBtn = document.getElementById("searchBtn")
let mainContetnContainer = document.querySelector("#mainContetnContainer")
let myLoader = document.querySelector(".myLoader")
let page = 1;


let callApi = async (input) => {

    let api = input ? `https://newsapi.org/v2/everything?q=${input}&pageSize=12&page=${page ? page : "1"}&apiKey=64593835334442299b0c95aeef93bc04` : `https://newsapi.org/v2/top-headlines?country=us&pageSize=13&page=${page ? page : "1"}&apiKey=64593835334442299b0c95aeef93bc04`
    mainContetnContainer.style.display = "none";
    myLoader.style.display = "flex";

    const call = await fetch(api)
    const response = await call.json()

    const { articles } = response

    console.log(articles);

    if (input) {
        renderData(articles, input)
    } else {
        renderData(articles)
    }

}
callApi()

function renderData(data, input) {
    let newsBox = document.getElementById("newsBox");

    newsBox.innerHTML = "";
    mainContetnContainer.style.display = "block";
    myLoader.style.display = "none";

    let h1 = document.createElement("h1")
    h1.textContent = input ? `${input.charAt(0).toUpperCase() + input.slice(1)} News` : "Trending News";
    newsBox.prepend(h1);

    newsBox.innerHTML += renderCards(data)

    newsBox.innerHTML += renderPagination()


}


function renderCards(data) {
    return data.map(news => `
    <div class="card col-3" style="width: 18rem;">
      <img src="${news.urlToImage || ''}" class="card-img-top" alt="news image not working">
      <div class="card-body">
        <span class="badge text-bg-info">
          ${moment(news.publishedAt).fromNow()}
        </span>
        <h5 class="card-title mt-2">
          ${news.title?.slice(0, 60)}
        </h5>
        <p class="card-text">
          ${news.description ? news.description.slice(0, 60) : "no description provided"}
        </p>
        <a href="${news.url}" target="_blank" class="btn">read full news</a>
      </div>
    </div>
  `).join("");
}


function renderPagination() {
    return `<nav id="pages" aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <p class="page-link"  onclick="decrePage()" aria-label="Previous">
        <span aria-hidden="true">Previous</span>
      </a>
    </li>
    <li class="page-item">
      <p class="page-link" onclick="increasePage()"  aria-label="Next">
        <span aria-hidden="true">Next</span>
      </p>
    </li>
  </ul>
</nav>`
}



searchBtn.addEventListener("click", function () {
    let inputVal = document.getElementById("inputVal")

    if (inputVal.value) {
        callApi(inputVal.value)
    } else {

        alertbox.render({
            alertIcon: 'warning',
            title: 'Please write properly',
            btnTitle: 'Ok',
            border: true,
            themeColor: 'rgb(191, 119, 42)'
        });
    }
})





function increasePage() {
    let inputVal = document.getElementById("inputVal")
    console.log("clicked");
    page++;
    if (inputVal) {
        callApi(inputVal.value)
    }
}
function decrePage() {
    if (page <= 1) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        return;
    }
    page--;
    let inputVal = document.getElementById("inputVal")
    console.log("clicked");

    if (inputVal) {
        callApi(inputVal.value)
    }
}   