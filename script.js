const api_key = "1728ae496dcb4c098a7493e77fbb8cc7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchNewsData("India");
})


async function fetchNewsData(input_from_user){
    const URL = `${url}${input_from_user}&apiKey=${api_key}`;
    const response =  await fetch(URL);
    const result = await response.json();
    console.log(result);
    printAllNewsData(result.articles)
}


function printAllNewsData(data) {
    const container = document.getElementById("cards-conatiner");
    container.innerHTML = ""; // Clear existing content

    data.forEach(element => {
        const date = new Date(element.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });

        if (!element.urlToImage) return;

        const cards = document.createElement("div");
        cards.className = "card";
        cards.innerHTML = `
            <div class="card-header">
                <img src="${element.urlToImage}" alt="news-image" id="news-image" />
            </div>
            <div class="card-content">
                <h3 id="new-title">${element.title}</h3>
                <h6 id="news-source" class="news-source"><span class ="news-channel">${element.source.name}</span> -> ${date}</h6>
                <p id="news-desc">${element.description}</p>
            </div>
        `;
        container.appendChild(cards);
        cards.addEventListener("click", () => {
            window.open(element.url, "-blank");
        });
    });
}


function onNavItemClick(query) {
    fetchNewsData(query);
    const navItems = document.querySelectorAll(".flex li");
    navItems.forEach(item => {
        item.classList.remove("active");
    });
    const clickedNavItem = document.getElementById(query);
    clickedNavItem.className="active";
    
}



const searchData_from_user = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", ()=>{
    const string = searchData_from_user.value.trim();
    fetchNewsData(string);
})


searchData_from_user.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        const string = searchData_from_user.value.trim();
        if(!string){
            return;
        }
        fetchNewsData(string);
        searchData_from_user.value = " ";
    }
})


function reload(){
    window.location.reload();
}


const clickMenu = document.getElementById("clickMenu");
const menu = document.getElementById("burger-menu2");
let check = false;

clickMenu.addEventListener("click", () => {
    if (check === false) {
        menu.style.display = "block";
        check = true;
    } else {
        menu.style.display = "none";
        check = false;
    }
});

