const apiShop = 'https://fakestoreapi.com/products'

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}

const categoryClothes = ['Pantalones', 'Remeras', 'Camperas', 'Buzos', 'Zapatillas', 'Accesorios'];

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
    <div class="col-6 card-ctn" data-category="${clothes.category}">
    <div class="card p-0 text-bg-dark effect">
    <img src="${clothes.image}" class="card-img-top card_sm rounded-4" alt="${clothes.title}">
    <div class="card-img-overlay d-flex flex-column justify-content-between p-0">
        <div class="d-flex justify-content-end m-2">
            <div class="d-flex justify-content-center icon-dimentions">
                <i class="bi bi-heart-fill fs-4"></i>
            </div>
        </div>
        <div class="container-detail px-2 py-3 d-flex flex-column justify-content-between">
            <h5 class="card-title text-white fs-6">${clothes.title}</h5>
            <div class="d-flex justify-content-between">
                <div class="price text-white fs-3">
                    <sup>$</sup>
                    <span>${clothes.price}</span>
                </div>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal"
                    data-bs-target="#exampleModal${clothes.id}">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade px-4" id="exampleModal${clothes.id}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark">
                    <div class="modal-body d-flex justify-content-center">
                        <div class="card">
                            <div class="row g-0">
                                <div class="col-md-5 d-flex justify-content-center align-items-center">
                                    <img src="${clothes.image}" class="img-fluid rounded-start" style="height:500px" alt="${clothes.title}">
                                </div>
                                <div class="col-md-7 bg-green">
                                    <div class="card-body ">
                                        <h5 class="fs-2 text-dark">${clothes.title}</h5>
                                        <div class="descrition text-dark">
                                            <h4>Description</h4>
                                            <p>${clothes.description}</p>
                                        </div>
                                        <div class="colors">
                                            <h4 class="tittle-h4 text-dark">Colors</h4>
                                            <div class="d-flex justify-content-between col-12">
                                                <div class="box-color bg-primary"></div>
                                                <div class="box-color bg-info"></div>
                                                <div class="box-color bg-secondary"></div>
                                                <div class="box-color bg-success"></div>
                                                <div class="box-color bg-danger"></div>
                                                <div class="box-color bg-warning"></div>
                                                <div class="box-color bg-black"></div>
                                                <div class="box-color bg-light"></div>
                                            </div>
                                        </div>
                                        <div class="sizes mt-3">
                                            <h4 class="tittle-h4 text-dark">Sizes</h4>
                                            <ul class="list-group list-group-horizontal">
                                                <li class="list-group-item border-dark">S</li>
                                                <li class="list-group-item border-dark">M</li>
                                                <li class="list-group-item border-dark">L</li>
                                                <li class="list-group-item border-dark">XL</li>
                                                <li class="list-group-item border-dark">2XL</li>
                                                <li class="list-group-item border-dark">3XL</li>
                                            </ul>
                                        </div>
                                        <div class="buy d-flex justify-content-between align-items-center mt-4">
                                            <div class="price text-dark">
                                                <sup class="fs-5">$</sup>
                                                <span class="fs-2 fw-bold">${clothes.price}</span>
                                            </div>
                                            <div class="btn-buy">
                                                <a href="#" class="btn btn-dark fs-5"><i class="bi bi-cart-plus"></i> Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
}

// Input Search Filter
const inputSearch = () =>{
    const allCards = document.querySelectorAll(".card-ctn");

    const inputSearchEvents = document.getElementById("input-search-events");

    inputSearchEvents.addEventListener("blur", (event) =>{
            const emptyCardContainer = document.getElementById("emptyContainer");
            let noResultsCard = ``;
        
            console.log("event.target.value", event.target.value)
            allCards.forEach(card => {
                let title = card.querySelector(".card-title").textContent;
        
                title.toLowerCase().includes(event.target.value.toLowerCase())
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
}
// Input Search Filter Button 
const searchFilterButton = document.getElementById("input-search-button");

searchFilterButton.addEventListener("click", (e) =>{
    inputSearch();
    e.preventDefault();
})

// 
const addCategory = (prod) => {
    //inserto los checks

    //obtengo elemento random de categoryClothes
    let random = Math.floor(Math.random() * categoryClothes.length);

    //inserto elemento random en prod
    prod.category = categoryClothes[random];
}

// CheckBox elements
const elemCheck = (event) => {
    return `
            <div class="col-6 col-lg-12" >
                 <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" value="${event}" id="flexCheck" >
                    <label class="form-check-label" for="flexCheckDefault">
                         ${event}
                    </label>
                 </div>
             </div>
             `
}

const insertChecks = () => {
    //obtengo elemento
    const containerChecks = document.querySelector('.check-opt');
    console.log(containerChecks)
    //inserto elemento
    categoryClothes.forEach((event) => {
        containerChecks.insertAdjacentHTML('beforeend', elemCheck(event))

    })
};

// Checkbox Filter Function
const containerChecks = document.querySelector('.check-opt');

containerChecks.addEventListener("change", () => {
    const inputsCheckbox = document.querySelectorAll(".form-check-input");
    
    var categoriesChecked = [];
    
    inputsCheckbox.forEach((inputBox) =>{
        inputBox.checked
        ? categoriesChecked.push(inputBox.value)
        : null
        console.log(inputBox.checked)
    });
    
    console.log(inputsCheckbox)
    console.log(categoriesChecked)

    cardsFilter(categoriesChecked);
    noSelect(categoriesChecked);
});

cardsFilter = (filteredArray) => {
    const allCards = document.querySelectorAll(".card-ctn");

    allCards.forEach((card) => {
        filteredArray.includes(card.getAttribute("data-category"))
            ? card.classList.remove("hidden")
            : card.classList.add("hidden");
    });
};

noSelect = (filteredArray) => {
    const allCards = document.querySelectorAll(".card-ctn");

    filteredArray.length === 0 
        ? allCards.forEach((card) => {
            card.classList.remove("hidden")
        })
        : null
};
