const apiShop = 'https://fakestoreapi.com/products?limit=6'

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}

const renderUsers = async() => {
    const shop = await getUsersAsync()
    const containerCards = document.getElementById('container-cards-trend')
    const containerCards1 = document.getElementById('container-cards-unisex')
    shop.map(clothes => {
        containerCards.insertAdjacentHTML('beforeend', renderCard(clothes))
        containerCards1.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
}
renderUsers()

const renderCard = (clothes) => {
    return `
    <div class="col-6 col-sm-4">
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


