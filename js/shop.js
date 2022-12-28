const apiShop = 'https://61e71f3dce3a2d0017359624.mockapi.io/articles'

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}
const categoryClothes = ['Pantalones', 'Remeras', 'Camperas', 'Buzos', 'Zapatillas', 'Accesorios']
const renderUsers = async() => {
    // 
    const shop = await getUsersAsync()
    //
    const containerCards = document.getElementById('container-cards')
    insertChecks();
    shop.map(clothes => {
        addCategory(clothes)
        containerCards.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
}
renderUsers()

const renderCard = (clothes) => {
    return `
    <div class="col-6" id="${clothes.id}">
        <div class="card h-100">
            <img src="../assets/2.png" class="card-img-top rounded-1 h-100" alt="${clothes.name}">
        </div>
        <label id="${clothes.category}"></label>
    </div>
    `
}

const elemCheck = (event) => {
    return `
            <div class="col-6 col-lg-12">
                 <div class="form-check mt-2">
                 <input class="form-check-input" type="checkbox" value="${event}" id="flexCheck" >
                     <label class="form-check-label" for="flexCheckDefault">
                         ${event}
                     </label>
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

const addCategory = (prod) => {
    //inserto los checks

    //obtengo elemento random de categoryClothes
    let random = Math.floor(Math.random() * categoryClothes.length);

    //inserto elemento random en prod
    prod.category = categoryClothes[random];


}


const insertChecks = () => {
    //obtengo elemento
    const containerChecks = document.querySelector('.check-opt');
    console.log(containerChecks)
    //inserto elemento
    categoryClothes.forEach((event) => {
        containerChecks.insertAdjacentHTML('beforeend', elemCheck(event))

    })

}
