/*
                                  _
                               _ooOoo_
                              o8888888o
                              88" . "88
                              (|-- --|)
                              O\  =  /O
                           ____/`---'\____
                         .'  \\|     |//  `.
                        /  \\|||  :  |||//  \
                       /  _||||| -:- |||||_  \
                       |   | \\\  -  /'| |   |
                       | \_|  `\`---'//  |_/ |
                       \  .-\__ `-. -'__/-.  /
                     ___`. .'  /--.--\  `. .'___
                  ."" '<  `.___\_<|>_/___.' _> \"".
                 | | :  `- \`. ;`. _/; .'/ /  .' ; |
                 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
       ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
                               `=--=-'                    
                        
*/


let elms = JSON.parse(localStorage.getItem("carritoData"));
const getAllArticles = async () => {
    try {
        const res = await fetch('../js/data.json');
        let json = await res.json();
        return json
    } catch (error) {
    }
}
const getPr = async(ini,fn) => {
    const respose = await fetch("../js/data.json") 
    //acorto la respuesta a json y la guardo en data
    const dt = await respose.json()
    //acorto el array a 6 elementos
    return dt.slice(ini,fn);
}
/* *** Template *** */

const renderCard = (clothes) => {
    return `
    <div class="col-6 col-sm-4" id="${clothes.id}">
    <div class="card p-0 class-prueba effect">
    <img src="${clothes.image}" class="card-img-top card_sm rounded-4" alt="${clothes.title}">
    <div class="card-img-overlay d-flex flex-column justify-content-between p-0">
        <div class="d-flex justify-content-end m-2">
            <!--<div class="d-flex justify-content-center icon-dimentions">
                <i class="bi bi-heart-fill fs-4"></i>
            </div>-->
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
                                                <a href="#" class="btn btn-dark fs-5 agregarElem" id="${clothes.id}"><i class="bi bi-cart-plus"></i> Add to cart</a>
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

/* const cardProducto = (elem) => {
    return `
    <div class="card" style="width: 18rem;">
    <img class="card-img" src="${elem.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${elem.title}</h5>
      <h4>$${elem.price}</h4>
      <a  class="btn btn-primary agregarElem" id="${elem.id}" >agregar al carrito</a>
    </div>
    </div>
    `
} */

const listCarrito = (elem) => {
    return `
    <li class="li-elements">
        <div class="info-principal">
            <img  class="card-img" src="${elem.image}" alt="" class="d-none">
            <span class="">${elem.title}</span>
            <span class="">$${elem.price}</span>
        </div>
        <div class="info-secundaria" id="${elem.id}">  
            <span id="cant" class="">${elem.cant}</span>
        </div>

    </li>
    `
}

const renderCards = async() => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    const shop1 = await getPr(4,10)
    const shop2 = await getPr(11,17)
    const containerCards = document.getElementById('container-cards-trend')
    const containerCards1 = document.getElementById('container-cards-unisex')
    shop1.map(clothes => {
        containerCards.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
    shop2.map(clothes => {
        
        containerCards1.insertAdjacentHTML('beforeend', renderCard(clothes))
    })
    addAgrCarrito(carritoDataLS,shop1)
    addAgrCarrito(carritoDataLS,shop2)
    getCoupon();
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

//renderizo todos los productos
const renderProducts = async () => {
    renderBtnCarrito()
    //json // undefined 
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let container = document.querySelector("#container-cards")
    let data = await getAllArticles();
    let btn;
    //contenedor del carrito
    renderCarrito(carritoDataLS)
    data.forEach(element => {
        container.innerHTML += renderCard(element)
    });
    addAgrCarrito(carritoDataLS, data)
    obtPriceTotal(carritoDataLS);
}
const addAgrCarrito = (carritoDataLS,data) => {
    let btn = document.querySelectorAll(".agregarElem")
    btn.forEach(elem => {
        elem.addEventListener("click", () => {
            insertarPrCarrito(carritoDataLS, data, elem.id)
        })
    })
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
    let numElem = document.querySelector("#cantProd")
    let cantElem = 0;
    if (car.length != 0) {
        carritoData.innerHTML = "";
        car.forEach(elem => {
            cantElem += elem.cant;
            carritoData.innerHTML += listCarrito(elem)
        })
        let elemsInfPrinc = document.getElementsByClassName("info-principal");
    }else{
        carritoData.innerHTML = "";
        carritoData.innerHTML = `<img src="./assets/cart_empty_inicia_shop.png" alt="Cart empty" class="mb-2 rounded-3" width="300"></img>`
    }
    cantElementos(cantElem)
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
        //console.log("no existe");
    }
}
const agregarUnPrCarrito = (car) => {
    let btnAgregar = document.querySelectorAll(".agregarUno")
    btnAgregar.forEach(elem => {
        elem.addEventListener("click", () => {
            let spanCant = elem.parentElement.querySelector("#cant")
            let id = elem.parentElement.id;
            let carritoData = car.find(elem => elem.id == id)
            carritoData.cant += 1;
            spanCant.innerHTML = carritoData.cant;
            obtPriceTotal(car)
        })
    })
}

const quitarPrCarrito = (car,func) => {
    let btnQuitar = document.querySelectorAll(".elimProd")
    let btnVaciar = document.querySelector(".vaciarCarrito")
    btnQuitar.forEach(elem => {
        elem.addEventListener("click", () => {
            //obtengo id del producto
            let id = elem.parentElement.id;
            //le quito 1 a la cantidad
            let carritoData = car.find(elem => elem.id == id)
            carritoData.cant -= 1;
            //si la cantidad es 0 lo elimino
            if (carritoData.cant == 0) {
                car = car.filter(elem => elem.id != id)
            }
            //guardo en localStorage
            localStorage.setItem("carritoData", JSON.stringify(car))
            nav();
        })
    })
    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carritoData");
        nav();
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
    //recorto a 2 decimales
    total = total.toFixed(2);
    priceTotal.innerHTML = `$ ${total}`;
}
const obtProducto = (car, data, id) => {
    let carritoData = car;
    console.log(data, id);
    let prod = data.find(elem => elem.id == id)
    console.log(prod);
    //si el producto no existe en el carritoData lo agrego
    if (!carritoData.find(elem => elem.id == prod.id)) {
        prod.cant = 1;
        carritoData.push(prod)
    }
    else {
        //si el producto existe en el carritoData lo agrego
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
const renderResume = () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let arrImg = [];
   //inserto datos
   renderCarrito(carritoDataLS)
   //obtengo todos los elementos del carrito
    let elemsCarritoSec = document.querySelectorAll(".li-elements");
    elemsCarritoSec.forEach(elem => {
        //quito la clase d-none
        let infoPrinc = elem.querySelector(".info-principal");
        let infoSec = elem.querySelector(".info-secundaria");
        infoPrinc.classList.remove("d-none");
        //inserto arriba del span
        infoSec.insertAdjacentHTML("afterbegin", 
            `
            <button class=" btn-prod-carrito elimProd bg-danger">
                <i class="bi bi-dash"></i>
            </button>
            `
        );
        //inserto abajo del span
        infoSec.insertAdjacentHTML("beforeend", 
            `
            <button class=" btn-prod-carrito agregarUno bg-success">
                <i class="bi bi-plus "></i>
            </button>
            `
        );
    })
    //agrego funcion sumar cantidad
    quitarPrCarrito(carritoDataLS)
    agregarUnPrCarrito(carritoDataLS)
    obtPriceTotal(carritoDataLS)
    btnCoupon();
}

//Finish Shopping alert
function finishShoppingAlert() {
    Swal.fire({
        title: 'Submit your email',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enter',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            if (email.includes('@')) {
            Swal.fire({
                title: 'Thank you for shopping with us!',
                text: "We'll send you an email with a payment form right away!",
                imageUrl: '../assets/',
            })
            }
            else {
                Swal.showValidationMessage(
                    'Please enter a valid email.'
                )
            }
        }
    })
}


// Coupons

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

// HOME 
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
        let priceTotal = document.querySelector(".priceTotal")
        console.log("priceTotal.value", priceTotal.innerHTML.slice(1))
        let total = Number(priceTotal.innerHTML.slice(1)) - Number(priceTotal.innerHTML.slice(1))*0.1;
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


const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();
    switch (URLactual) {
        case 'index.html':
            renderProducts()
            renderCards()
            break;
        case 'resume.html':
            renderResume()
        break;
        case 'shop.html':
            //alert("shop")
            renderProducts()

        break;
        default:
            //insert 404
            renderProducts()
            renderCards()
        break;
    }
}
nav();