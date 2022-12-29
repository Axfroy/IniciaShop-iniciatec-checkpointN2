const apiShop = 'https://picsum.photos/v2/list'

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}

const renderUsers = async() => {
    const shop = await getUsersAsync()
    const containerCards = document.getElementById('container-cards')

    shop.map(clothes => {
        containerCards.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
}
renderUsers()

const renderCard = (clothes) => {
    return `
    <div class="col-6 card-ctn" id="${clothes.id}">
        <div class="card h-100">
            <img src="../assets/2.png" class="card-img-top rounded-1 h-100" alt="${clothes.author}">
        </div>
    </div>
    `
}

// Input Search Filter
const inputSearchEvents = document.getElementById("input-search-events");

inputSearchEvents.addEventListener("keyup", (event) =>{
    const allCards = document.querySelectorAll(".card-ctn");
    //console.log("allCards", allCards)
    const emptyCardContainer = document.getElementById("emptyContainer");
    let noResultsCard = ``;
    //let allCardsArray = Array.prototype.slice.call(allCards);
    //console.log"allCardsArray", allCardsArray)
    console.log("event.target.value", event.target.value)
    // console.log("event.key", event.key)
    allCards.forEach(card => {
        console.log(card.id);
        card.id
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
        ? card.classList.remove("hidden")
        : card.classList.add("hidden");
    }); 
    let eventResult = document.querySelectorAll(".hidden");

    if (eventResult.length === allCards.length){
        noResultsCard += `
            <div class="container text-center">
                <div style="width: 250px; margin: 0 auto">
                    <img style="width: 100%;" src="#" alt="">
                </div>
                <p>Please try another search</p>
            </div>
            `
        }
    emptyCardContainer.innerHTML = noResultsCard;
});