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
    <div class="card p-0 bg-inicia effect border border-dark rounded-4">
    <img src="${clothes.image}" class="card-img-top card_sm rounded-4 img-prod" alt="${clothes.title}">
    <div class="card-img-overlay d-flex flex-column justify-content-between p-0">
        <div class="d-flex justify-content-end m-2">
            <div class="d-flex justify-content-center icon-dimentions">
                <i class="bi bi-heart-fill fs-4"></i>
            </div>
        </div>
        <div class="container-detail rounded-4 px-2 py-3 d-flex flex-column justify-content-between">
            <h5 class="card-title text-white fs-3">${clothes.title}</h5>
            <div class="d-flex justify-content-between">
                <div class="price text-white fs-3">
                    <sup "fw-semibold>$</sup>
                    <span "fw-semibold>${clothes.price}</span>
                </div>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-dark btn-showData" data-bs-toggle="modal"
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
                                    <img src="${clothes.image}" class="img-fluid img-pr-desc " style="height:500px" alt="${clothes.title}">
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
                                                <div class="d-flex justify-content-between opt-colors col-12">
                                                    <div class="box-color bg-primary" value="bg-primary" ></div>
                                                    <div class="box-color bg-info" value="bg-info""></div>
                                                    <div class="box-color bg-secondary" value="bg-secondary"></div>
                                                    <div class="box-color bg-success" value="bg-success"></div>
                                                    <div class="box-color bg-danger" value="bg-danger"></div>
                                                    <div class="box-color bg-warning" value="bg-warning"></div>
                                                    <div class="box-color bg-black" value="bg-black"></div>
                                                    <div class="box-color bg-light" value="bg-light"></div>
                                                </div>
                                        </div>
                                        <div class="sizes mt-3">
                                            <h4 class="tittle-h4 text-dark">Sizes</h4>
                                            <ul class="list-group list-group-horizontal opt-talles  º">
                                                <li class="list-group-item box-talle border-dark">S</li>
                                                <li class="list-group-item box-talle border-dark">M</li>
                                                <li class="list-group-item box-talle border-dark">L</li>
                                                <li class="list-group-item box-talle border-dark">XL</li>
                                                <li class="list-group-item box-talle border-dark">XXL</li>
                                            </ul>
                                        </div>
                                        <div class="buy d-flex justify-content-between align-items-center mt-4">
                                            <div class="price text-dark">
                                                <sup class="fs-5 fw-bold">$</sup>
                                                <span class="fs-2 fw-bold">${clothes.price}</span>
                                            </div>
                                            <div class="btn-buy">
                                                <a href="#" class="btn btn-dark fs-5 agregarElem" id="${clothes.id}"><i class="bi bi-bag-check me-1"></i> Add to cart</a>
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
    <li class="row li-elements d-flex align-items-center">
        <div class="col-lg-1 col-2 info-principal ">
            <img class="card-img col-lg-2 col-2" src="${elem.image}" alt="${elem.title}" > 
        </div>
        <div class="col-lg-3 col-10 container-title  ">
            <span class="fs-4">${elem.title}</span>
        </div> 

        <div class="col-lg-2 col-4 d-none d-flex justify-content-center">
            <div class="fs-5 box-color ${elem.color} "></div>
        </div>
        <div class="col-lg-2 col-4 d-none">
            <span class="fs-5 ">${elem.size}</span>
        </div>

        <div class="col-lg-3 col-4 text-start ps-5">
            <span class="fs-5 ms-4">$${elem.price}</span>
        </div>
        <div class="col-lg-3 info-secundaria col-12 d-flex-btn" id="${elem.id}">  
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
    let allElems = shop1.concat(shop2);
    addAgrCarrito(carritoDataLS,allElems)
    addOpcColorTalle()
    getCoupon();
}

const getCoupon = () => {
    const subsBtn = document.getElementById("subs-btn");
    subsBtn.addEventListener("click", () => {
        let inputMail = document.querySelector("#newsletter1");
        console.log("inputMail", inputMail.value)
        if (inputMail != `` && inputMail.value.includes('@')) {
            if (localStorage.getItem('emailCoupon') != inputMail.value) {
            swalFunction();
            localStorage.setItem('emailCoupon', inputMail.value)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "You've already got a coupon!",
                  })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You need to enter a valid email to get a coupon!",
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
            //si no es null
            
            if (element != null) {
                container.innerHTML += renderCard(element) 
            }
    });
    addOpcColorTalle()
    addAgrCarrito(carritoDataLS, data)
    obtPriceTotal(carritoDataLS);
}

const addOpcColorTalle = () => {
    //obtengo el boton de abrir el modal
    let btnModal = document.querySelectorAll(".btn-showData");
    btnModal.forEach(elem => {
        elem.addEventListener("click", () => {
            eventOpc()
        })
    })
    // agrego el evento del click de los colores y talles
    //const ards = cards.filter(card => !card.classList.contains('selected'));*/

}

const   eventOpc = () => {
    //obtengo todos los colores
    let opcColor = document.querySelectorAll(".box-color");
    let opcSize = document.querySelectorAll(".box-talle");
    opcColor.forEach(elem => {
        elem.addEventListener("click", () => {
            //quito la clase checked de todos los colores
            opcColor.forEach(elem => {
                elem.classList.remove("checked")
            })
            //agrego la clase checked al color seleccionado
            elem.classList.add("checked")
        })
    })

    opcSize.forEach(elem => {
        elem.addEventListener("click", () => {
            //quito la clase checked de todos los talles
            opcSize.forEach(elem => {
                elem.classList.remove("checked")
            })
            //agrego la clase checked al talle seleccionado
            elem.classList.add("checked")
        })
    })
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
        carritoData.innerHTML = `<p><img src="./assets/cart_empty.png" alt="Cart empty" class="mb-2 rounded-3" width="300"></img></p>`;
        carritoData.innerHTML = `<p><img src="../assets/cart_empty.png" alt="Cart empty" class="mb-2 rounded-3" width="300"></img></p>`
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
    priceTotal.innerHTML = `$${total}`;
}
const obtProducto = (car, data, id) => {
    let carritoData = car;
    //console.log(data, id);
    let prod = data.find(elem => elem.id == id)
    console.log("encontrado");
    let opcColor = document.querySelector('.opt-colors .checked').getAttribute("value");
    let opcSize = document.querySelector('.opt-talles .checked').innerHTML;

    //verifico si el producto ya esta en el carrito
            //verifico si el producto ya esta en el carrito
        let prodCarrito = carritoData.find(elem => (elem.id == id) && (elem.color == opcColor) && (elem.size == opcSize))

        //si existe le sumo 1 a la cantidad
        if (prodCarrito) {
            prodCarrito.cant += 1;
        }else{
            //si no existe lo agrego al carrito
            prodCarrito = {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                image: prod.image,
                cant: 1,
                color: opcColor,
                size: opcSize
            }
            console.log("prodCarrito" ,prodCarrito);
            carritoData.push(prodCarrito)
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
        //obtengo el color y el size de carritoDatals
        
        
        let infoSec = elem.querySelector(".info-secundaria");
        //obtengo la clase de bootstrap
        let allStyleClasOfElem = elem.querySelectorAll(' [class^="col-lg-"]')
        //quito todas las clases de bootstrap
        allStyleClasOfElem.forEach(elem => {
            
            elem.classList.remove(elem.classList[0])
            //elimino la class d-none
            elem.classList.remove("d-none")
            //verifico si contiene la clase container-title
            if (elem.classList.contains("info-principal")) {
                elem.classList.add("col-lg-1")
            }else if(elem.classList.contains("container-title")){
                elem.classList.add("col-lg-3")
            }else{
                elem.classList.add("col-lg-2")
            }
            
        })
        //agrego la clase de bootstrap
        console.log(allStyleClasOfElem);        
        let infoTitle = elem.querySelector(".container-title");
        //inserto el color y el size por debajo del titulo
       

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

//RESUME
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
        background: `url(../assets/bg-cupon.gif)`,
    })
}

//RESUME
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
    let discountApplied = false;
    if ( !discountApplied && coupon.trim() == localStorage.getItem('code10').trim()) {
        let priceTotal = document.querySelector(".priceTotal")
        console.log("priceTotal.value", priceTotal.innerHTML.slice(1))
        let total = Number(priceTotal.innerHTML.slice(1)) - Number(priceTotal.innerHTML.slice(1))*0.1;
        console.log("Total", total);
        priceTotal.innerHTML = ``;
        priceTotal.innerHTML =  `$${total}`;
        localStorage.clear('code10'); 
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your discount has been applied!',
            showConfirmButton: false,
            timer: 1500
          })
        discountApplied = true;
    }  
    else { 
        if (discountApplied) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You've already used a coupon!",
              })
        } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "This's not a valid code, try again.",
          })
        }
    }
}

const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();
    switch (URLactual) {
        case 'index.html':
            renderProducts()
            renderCards()
            renderCarrito()
            break;
        case 'resume.html':
            renderCarrito()
            renderResume()
            
        break;
        case 'shop.html':
            //alert("shop")
            renderCarrito()
            renderProducts()
            
        break;
        default:
            //insert 404
            renderProducts()
            renderCarrito()
            renderCards()
        break;
    }
}
nav();

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
