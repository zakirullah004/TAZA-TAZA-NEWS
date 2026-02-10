// endppoint url = "https://gnews.io/api/v4/search?q=example&apikey=API_KEY" 
//top headlines = "https://gnews.io/api/v4/top-headlines?category=general&apikey=API_KEY"
const apiKey = "39f9670b647c1b7cba12d9aed12f51e3"
let callApi = async () => {

    const call = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&apikey=${apiKey}`)
    const response = await call.json()

    const {articles} = response

    console.log(articles);

    renderData(articles)

}
callApi()

function renderData(data) {
    let newsBox = document.getElementById("newsBox");

    data.forEach(news => {
    newsBox.innerHTML += `
      <div class="card col-3" style="width: 18rem;">
            <img src="${news.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <span class="badge text-bg-info">${moment(new Date(), `${news.publishedAt}`).fromNow()}</span>
                <h5 class="card-title mt-2">${news.title.slice(0,30)}</h5>
                <p class="card-text">${news.description.slice(0,50)}</p>
                <a href="${news.url}" target="_blank" class="btn">read full news</a>
            </div>
        </div>
    `;
    
    });
}


let inputVal = document.getElementById("inputVal")
let searchBtn = document.getElementById("searchBtn")

searchBtn.addEventListener("click",function(){
    if(inputVal){
        
    }
})
