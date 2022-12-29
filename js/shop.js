const apiShop = 'https://61e71f3dce3a2d0017359624.mockapi.io/articles'
const categoryClothes = ['Pantalones', 'Remeras', 'Camperas', 'Buzos', 'Zapatillas', 'Accesorios']

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}

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


const eventFiltroCheck = () => {

    }

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
    //inserto elemento
    categoryClothes.forEach((event) => {
        containerChecks.insertAdjacentHTML('beforeend', elemCheck(event))
        
    })

}
