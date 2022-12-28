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
    <div class="col-6">
        <div class="card h-100">
            <img src="../assets/2.png" class="card-img-top rounded-1 h-100" alt="${clothes.author}">
        </div>
    </div>
    `
}