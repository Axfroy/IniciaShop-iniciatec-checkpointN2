//get all articles


const elementos = [
    { price: 94, name: "Ellen Prohaska V", img: "https://loremflickr.com/600/480/fashion", id: "1", cant: 4 }
    ,
    { price: 94, name: "Curtis Hahn D", img: "https://loremflickr.com/633/480/fashion", id: "2", cant: 2 }
    ,
    { price: 89, name: "Ms. Dixie Torphy", img: "https://loremflickr.com/639/480/fashion", id: "3", cant: 1 }
    ,
    { price: 38, name: "Arlene Klocko V", img: "https://loremflickr.com/642/480/fashion", id: "4", cant: 1 }

]


localStorage.setItem("carritoData", JSON.stringify(elementos))

let elms = JSON.parse(localStorage.getItem("carritoData"));
const getAllArticles = async () => {
    try {
        let res = await fetch('https://61e71f3dce3a2d0017359624.mockapi.io/articles')
        let json = await res.json();

        return json
    } catch (error) {
        console.log(error);
    }


}

/* *** Template *** */

const cardProducto = (elem) => {
    return `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${elem.img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${elem.name}</h5>
      <h4>$${elem.price}</h4>
      <a  class="btn btn-primary agregarElem" id="${elem.id}" >agregar al carrito</a>
    </div>
    </div>
    `
}


const listCarrito = (elem) => {
    return `
        <li class="li-elements">
            <div class="info-principal">
            
            <span class="">${elem.name}</span>
            <span class="">$${elem.price}</span>
            </div>
            <div class="info-secundaria" id="${elem.id}">
                <button class=" btn-prod-carrito elimProd bg-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
                </button>
            <span id="cant" class="">${elem.cant}</span>
            <button class="btn-prod-carrito agregarUno bg-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
            </button>
            </div>
</li>
    `
}

//renderizo todos los productos
const renderProducts = async () => {
    //json // undefined 
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
   
    let container = document.querySelector(".container-products")
    let data = await getAllArticles();
    let btn;
    //toggle carrito
    renderBtnCarrito()
    

    //contenedor del carrito
    renderCarrito(carritoDataLS)
    data.forEach(element => {
        container.innerHTML += cardProducto(element)

    });
    btn = document.querySelectorAll(".agregarElem")
    btn.forEach(elem => {
        elem.addEventListener("click", () => {
            insertarPrCarrito(carritoDataLS, data, elem.id)
        })
    })

    obtPriceTotal(carritoDataLS);


}
const renderBtnCarrito = () => {
    let btnCarrito = document.querySelector(".btn-carrito")
    let carritoData = document.querySelector(".carritoData")
    if (btnCarrito) {
        
    
        
        btnCarrito.addEventListener("click", () => {
            carritoData.classList.toggle("dsp-none")
        })
    }
}
const renderCarrito = (car = []) => {

    let carritoData = document.querySelector(".list-carrito")
    //  console.log(carritoData);
    let numElem = document.querySelector("#cantProd")
    let arrImg = [];

    console.log(numElem);
    let cantElem = 0;

    carritoData.innerHTML = "";
    car.forEach(elem => {
        arrImg.push(elem.img);
        cantElem += elem.cant;
       // console.log(elem);
        carritoData.innerHTML += listCarrito(elem)

    })

    let elemsInfPrinc = document.getElementsByClassName("info-principal");
    // itero sobre los elementos
    console.log(elemsInfPrinc);
    for (let i = 0; i < elemsInfPrinc.length; i++) {
        let img = document.createElement("img");
        img.src = arrImg[i];
        //agrego la imagen
        elemsInfPrinc[i].insertAdjacentElement("afterbegin", img);
    } 
    


    cantElementos(cantElem)

    let total = document.querySelector(".total")


    quitarPrCarrito(car)
    agregarUnPrCarrito(car)
    obtPriceTotal(car)

}

const cantElementos = (cantElem) => {
    let numElem = document.querySelector("#cantProd")
    //verifico que exista
    if ( numElem != null ) {
        numElem.innerHTML = '';
        numElem.innerHTML = cantElem;
    }else{
        console.log("no existe");
    }
}


const agregarUnPrCarrito = (car) => {

    let btnAgregar = document.querySelectorAll(".agregarUno")
    console.log(btnAgregar);
    btnAgregar.forEach(elem => {
        elem.addEventListener("click", () => {
            let id = elem.parentElement.id;
            console.log(id);
            let carritoData = car.find(elem => elem.id == id)
            console.log(carritoData);
            carritoData.cant += 1;
            renderCarrito(car)
        })
    })


}

const quitarPrCarrito = (car) => {
    let btnQuitar = document.querySelectorAll(".elimProd")
    let btnVaciar = document.querySelector(".vaciarCarrito")

    console.log(car);

    btnQuitar.forEach(elem => {
        
        elem.addEventListener("click", () => {
            //obtengo id del producto
            let id = elem.parentElement.id;
            console.log(id);
            //le quito 1 a la cantidad
            let carritoData = car.find(elem => elem.id == id)
            console.log(carritoData);
            carritoData.cant -= 1;
            //si la cantidad es 0 lo elimino
            if (carritoData.cant == 0) {
                car = car.filter(elem => elem.id != id)
            }
            //guardo en localStorage
            localStorage.setItem("carritoData", JSON.stringify(car))
            renderProducts();
        })
    })

    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carritoData");
        renderCarrito();
    })

}

const insertarPrCarrito = (car, data, id) => {

    //obtengo clase carritoData
    obtProducto(car, data, id)
    //inserto desde localStorage
    renderCarrito(car);
}

const obtPriceTotal = (car) => {
    let priceTotal = document.querySelector(".priceTotal")
    let total = 0;
    car.forEach(elem => {
        total += elem.price * elem.cant
    })
    priceTotal.innerHTML = `$ ${total}`;
}
const obtProducto = (car, data, id) => {

    let carritoData = car;

    let prod = data.find(elem => elem.id == id)
    console.log(prod.id);
    //si el producto no existe en el carritoData lo agrego
    if (!carritoData.find(elem => elem.id == prod.id)) {
        prod.cant = 1;
        carritoData.push(prod)
        console.log(carritoData);
    }
    else {
        //si el producto existe en el carritoData lo agrego
        console.log("existe");
        //le sumo 1 al objeto en localStorage
        carritoData.forEach(elem => {
            if (elem.id == prod.id) {
                elem.cant += 1;
            }
        })
    }


    localStorage.setItem("carritoData", JSON.stringify(carritoData))

    renderCarrito(car);

}

//obtengo el template de carrito y le inserto imagen
const renderResume = (car = []) => {
    renderCarrito(elms)
    //traigo el carrito
 /*   let carritoData = document.querySelector(".list-carrito")
    //obtengo el id de cant de productos
    let numElem = document.querySelector("#cantProd")
    //console.log(numElem);
    let cantElem = 0;
    carritoData.innerHTML = "";
    car.forEach(elem => {
        //creo etiqueta img
        arrImg.push(elem.img);
        cantElem += elem.cant;
        carritoData.innerHTML += listCarrito(elem)
    })
    */ 
    // Aplicar descuento con cupon 
    btnCoupon();
}




//renderCarrito(elms)
const apiShop = 'https://fakestoreapi.com/products?limit=6'

const getUsersAsync = async() => {
    const respose = await fetch(apiShop) 
    const myJson = await respose.json()
    return myJson
}

const renderCards = async() => {
    const shop = await getUsersAsync()
    const containerCards = document.getElementById('container-cards-trend')
    const containerCards1 = document.getElementById('container-cards-unisex')
    shop.map(clothes => {
        containerCards.insertAdjacentHTML('beforeend', renderCard(clothes))
        containerCards1.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
    getCoupon() 
}

const getCoupon = () => {
    const subsBtn = document.getElementById("subs-btn");
    subsBtn.addEventListener("click", () => {
        let inputMail = document.querySelector("#newsletter1");
        console.log("inputMail", inputMail.value)
        if (inputMail != `` && inputMail.value.includes('@')) {
            swalFunction();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You need to enter your email to get a coupon!",
              })
        }
    })
}

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
const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();
    switch (URLactual) {
        //envio el getAllEvents
        case 'index.html':
            renderCards()
            break;
        case 'resume.html':
            renderResume(elms)
        break;
        default:
            //insert 404
            renderCards()
        break;
    }
}
nav();

// Coupons --------------------------------

// Random code
function randomCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// HOME ---------
// SWAL function 
function swalFunction() {
    let code = randomCode(8);
    localStorage.setItem("code10", code);
    Swal.fire({
        title: "Here's your 10% discount coupon!",
        text: code,
        width: 600,
        padding: '3em',
        color: 'black',
        background: `
        url(../assets/bg-cupon.gif)
        no-repeat
        cover
        `,
        backdrop: `
        rgba(0,0,123,0.4)
        url("../assets/nyan-cat-nyan.gif")
        left top
        no-repeat
        `
    })
}


// Discount function
function btnCoupon() {
    const cuponBtn = document.getElementById("cupon-btn");
    cuponBtn.addEventListener("click", (event) => {
        let coupon = document.querySelector(".input-coupon");
        console.log("coupon", coupon.value)
        applyDiscount(coupon.value);
    })
}
//btnCoupon();

function applyDiscount(coupon) {
    console.log("coupon in", coupon);
    console.log(coupon, " = ",localStorage.getItem('code10'));
    if (coupon.trim() == localStorage.getItem('code10').trim()) {
        console.log("Total", total);
        priceTotal.innerHTML = ``;
        priceTotal.innerHTML =  `$ ${total}`;
        localStorage.clear('code10'); 
    }  
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "This's not a valid code, try again.",
          })
    }
}

function discount() {
    let priceTotal = document.querySelector(".priceTotal")
    console.log("priceTotal.value", priceTotal.innerHTML.slice(1))
    let total = Number(priceTotal.innerHTML.slice(1)) - Number(priceTotal.innerHTML.slice(1))*0.1;
    return total
}

// FINISH SHOPPING PAGE --------------------

//Render precio total-------
/* function renderTotalPay() {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    obtPriceTotal(carritoDataLS)  
    console.log("discount", discount())
    if (localStorage.getItem('coupon')) {
        discount()
    }
    else {
        
    }
    let totalPay = document.getElementById("total-pay")
    //console.log("priceTotal", priceTotal)
    //totalPay.innerHTML = `${priceTotal.innerHTML}`
} */
//renderTotalPay()

//Get input info-----------
//Card Number, input 1
function getNumbI1() {
    let inputCard1 = document.getElementById("card-numb-1")
    inputCard1.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-1")
        //console.log("cardNumber", cardNumber.value)
        renderCardNumb1(cardNumber.value)
    })
}
getNumbI1();

//Card Number, input 2
function getNumbI2() {
    let inputCard2 = document.getElementById("card-numb-2")
    inputCard2.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-2")
        //console.log("cardNumber", cardNumber.value)
        renderCardNumb2(cardNumber.value)
    })
}
getNumbI2();

//Card Number, input 3
function getNumbI3() {
    let inputCard3 = document.getElementById("card-numb-3")
    inputCard3.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-3")
        //console.log("cardNumber", cardNumber.value)
        renderCardNumb3(cardNumber.value)
    })
}
getNumbI3();

//Card Number, input 4
function getNumbI4() {
    let inputCard4 = document.getElementById("card-numb-4")
    inputCard4.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-4")
        //console.log("cardNumber", cardNumber.value)
        renderCardNumb4(cardNumber.value)
    })
}
getNumbI4();

//Card Holder
function getCardHolder() {
    let cardHolder = document.getElementById("card-holder-input")
    cardHolder.addEventListener("keyup", () => {
        let cardName = document.querySelector("#card-holder-input")
        //console.log("cardName", cardName.value)
        renderCardHolder(cardName.value)
    })
}
getCardHolder();

//Expiration Date
function getExpirationMonth() {
    let expDateMonth = document.getElementById("exp-date-m")
    expDateMonth.addEventListener("keyup", () => {
        let month = document.querySelector("#exp-date-m")
        //console.log("Month", month.value)
        renderExpMonth(month.value)
    })
}
getExpirationMonth()

function getExpirationYear() {
    let expDateYear = document.getElementById("exp-date-y")
    expDateYear.addEventListener("keyup", () => {
        let year = document.querySelector("#exp-date-y")
        //console.log("Month", month.value)
        renderExpYear(year.value)
    })
}
getExpirationYear()

//CVV
function getCVV() {
    const inputCVV = document.getElementById("input-CVV")
    inputCVV.addEventListener("keyup", () => {
        let cvv = document.querySelector("#input-CVV")
        renderCVV(cvv.value)
    })
}
getCVV()

//Render input info--------
//Card Number, input 1
function renderCardNumb1(value) {
    let divNumbers = document.getElementById("numbers-1")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 2
function renderCardNumb2(value) {
    let divNumbers = document.getElementById("numbers-2")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 3
function renderCardNumb3(value) {
    let divNumbers = document.getElementById("numbers-3")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 4
function renderCardNumb4(value) {
    let divNumbers = document.getElementById("numbers-4")
    divNumbers.innerHTML = `${value}`
}

//Card Holder
function renderCardHolder(value) {
    let cardHolder = document.getElementById("card-holder")
    cardHolder.innerHTML = `${value.toUpperCase()}`
}

//Expiration date
function renderExpMonth(value) {
    let month = document.getElementById("exp-month")
    month.innerHTML = `${value}`
}

function renderExpYear(value) {
    let year = document.getElementById("exp-year")
    year.innerHTML = `${value}`
}

//CVV
function renderCVV(value) {
    let cvv = document.getElementById("number-cvv")
    cvv.innerHTML = `${value}`
}

//Payment confirmation-------
function payBtn() {
    const payBtn = document.getElementById("pay-btn");
    payBtn.addEventListener("click", () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your purchase has been made successfully!',
            showConfirmButton: false,
            timer: 3000
          })
    })
}
payBtn()