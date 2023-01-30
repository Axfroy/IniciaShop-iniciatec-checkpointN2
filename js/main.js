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

/*
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
*/
import { showMessage } from './showMessage.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { GoogleAuthProvider,FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

import { signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

import { auth, app } from './firebase.js';

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

onAuthStateChanged(auth, async (user) => {
    console.log(user);
    let logInItems = document.querySelectorAll('.logIn');
    let logOutItems = document.querySelectorAll('.logOut');
    let userLogin = document.querySelector('.userLogin');
    //obtengo el contenedor padre de userLogin
    let parent = userLogin.parentNode;
    if (user) {
        logInItems.forEach(item => item.style.display = 'block');
        logOutItems.forEach(item => item.style.display = 'none');
        userLogin.insertAdjacentHTML('afterend', `<a class=" logIn text-dark" href="">${user.displayName}</a>`);
        //user login style content
        userLogin.style.content = 'none';


        logout()
    } else {

        logInItems.forEach(item => item.style.display = 'none');
        logOutItems.forEach(item => item.style.display = 'block');
    }
});

const renderLoginEmail = () => {
    let signIn = document.getElementById('signIn');
    console.log(signIn);

    signIn.addEventListener('submit', (e) => {
        e.preventDefault();
        //obtengo los datos del formulario email y password
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let obj = {
            email: email,
            password: password
        }
        console.log(obj);
        //sign in
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then((userCredential) => {
                // Signed in   
                const user = userCredential.user;
                showMessage('User Login ;) ', 'success');
                 window.location.href = "../index.html";

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/wrong-password') {
                    showMessage('Wrong password', 'error');
                } else if (errorCode === 'auth/user-not-found') {
                    showMessage('User not found', 'error');
                } else if (errorCode === 'auth/invalid-email') {
                    showMessage('The email is invalid.', 'error');
                } else {
                    showMessage(errorMessage, 'error');
                }

            });


        console.log(obj);
    });

}

const renderSignUpGoogle =  () => {
    let signInGoogle = document.getElementById('signInGoogle');
    console.log(signInGoogle);

    signInGoogle.addEventListener('click', async() => {

        let provider = new GoogleAuthProvider();
        try {
            let credential = await signInWithPopup(auth, provider);
            showMessage('User Login ;) '+ credential.user.displayName , 'success');
            window.location.href = "../index.html";

        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                showMessage('The email address is already in use by another account.', 'error');
            }
            if (error.code === 'auth/invalid-credential') {
                showMessage('The supplied auth credential is malformed or has expired.', 'error');
            }
            if (error.code === 'auth/operation-not-allowed') {
                //message for user
                showMessage('This operation is not allowed. You must enable this service in the console.', 'error');
            }
            if (error.code === 'auth/user-disabled') {
                showMessage('The user account has been disabled by an administrator.', 'error');
            }
        }

    
    });

    
}

const renderSignUpFacebook = () => {
    let signInFacebook = document.getElementById('signInFacebook');
    console.log(signInFacebook);

    signInFacebook.addEventListener('click', async() => {

        let provider = new FacebookAuthProvider();
        try {
            let credential = await signInWithPopup(auth, provider);
            showMessage('User Login ;) '+ credential.user.displayName , 'success');
            window.location.href = "../index.html";

        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                showMessage('The email address is already in use by another account.', 'error');
            }
            if (error.code === 'auth/invalid-credential') {
                showMessage('The supplied auth credential is malformed or has expired.', 'error');
            }
            if (error.code === 'auth/operation-not-allowed') {
                //message for user
                showMessage('This operation is not allowed. You must enable this service in the console.', 'error');
            }
            if (error.code === 'auth/user-disabled') {
                showMessage('The user account has been disabled by an administrator.', 'error');
            }

        }

    
    });

}

const renderSignUp = () => {
    //obtengo los datos del formulario
    //username
    let signUp = document.getElementById('signUp');
    signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;
        let terms = document.getElementById('terms').checked;
        let obj = {
            username: username,
            email: email,
            password: password,
            password2: password2
        }
        //verifico que el password sea igual al password2 y que este marcada la casiilla de terminos y condiciones

        if (obj.password === obj.password2 && terms) {


            createUserWithEmailAndPassword(auth, obj.email, obj.password)
                .then((userCredential) => {
                    // Signed in 


                    const user = userCredential.user;
                    console.log(user);
                    // ...
                    showMessage('User created :D', 'success');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    if (errorCode === 'auth/weak-password') {
                        showMessage('The password is too weak.', 'error');
                    }
                    if (errorCode === 'auth/email-already-in-use') {
                        showMessage('The email is already in use.', 'error');
                    }
                    if (errorCode === 'auth/invalid-email') {
                        showMessage('The email is invalid.', 'error');
                    }

                    // ..
                });
            console.log(obj);
        } else {
            if (!terms) {
                showMessage('You must accept the terms and conditions', 'error');
            }else{
                showMessage('Passwords do not match', 'error');

            }
        }
    });
}

const logout = () => {
    let logout = document.getElementById('logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('carritoData');
        //elimino favoritos
        localStorage.removeItem('fav');
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('User Logout');
            showMessage('User Logout', 'success');
            //elimino todo el localstorage carritodata
            renderBtnCarrito();
            
            nav();
        }).catch((error) => {
            // An error happened.
            showMessage('Error', 'error');
        });
    });
}


const getAllArticles = async () => {
    try {
        const res = await fetch('../js/data.json');
        let json = await res.json();
        return json
    } catch (error) {
    }
}
const getPr = async (ini, fn) => {
    const respose = await fetch("../js/data.json")
    const dt = await respose.json()
    return dt.slice(ini, fn);
}

const renderCard = (clothes) => {
    return `
<div class="col-6 col-sm-4 card-ctn" id="${clothes.id}" data-category="${clothes.category}">
    <div class="card p-0 bg-inicia effect border border-dark rounded-4">
    <img src="${clothes.image}" class="card-img-top card_sm rounded-4 img-prod" alt="${clothes.title}">
    <div class="card-img-overlay d-flex flex-column justify-content-between p-0">
        <div class="d-flex justify-content-end m-2">
            <div class="d-flex justify-content-center icon-dimentions">
                <i class="bi bi-heart-fill fs-4 agregarFav " id="${clothes.id}"></i>
            </div>
        </div>
        <div class="container-detail rounded-4 px-2 py-3 d-flex flex-column justify-content-between">
            <h5 class="card-title text-white fs-home">${clothes.title}</h5>
            <div class="d-flex justify-content-between align-items-center">
                <div class="price text-white fs-home">
                    <sup class="fw-semibold">$</sup>
                    <span class="fw-semibold">${clothes.price}</span>
                </div>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-dark btn-showData" data-bs-toggle="modal"
                    data-bs-target="#exampleModal${clothes.id}">
                    <i class="bi bi-plus-lg fs-home"></i>
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
                                    <img src="${clothes.image}" class="img-fluid img-pr-desc" style="height:500px" alt="${clothes.title}">
                                </div>
                                <div class="col-md-7 bg-green">
                                    <div class="card-body d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 class="fs-2 text-dark">${clothes.title}</h5>
                                            <div class="descrition text-dark">
                                                <h4>Description</h4>
                                                <p>${clothes.description}</p>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="colors">
                                                <h4 class="tittle-h4 text-dark">Colors</h4>
                                                <div class="d-flex justify-content-between opt-colors col-lg-12 col-12">
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
                                                <ul class="list-group list-group-horizontal opt-talles">
                                                    <li class="list-group-item box-talle border-dark">S</li>
                                                    <li class="list-group-item box-talle border-dark">M</li>
                                                    <li class="list-group-item box-talle border-dark">L</li>
                                                    <li class="list-group-item box-talle border-dark">XL</li>
                                                    <li class="list-group-item box-talle border-dark">XXL</li>
                                                </ul>
                                            </div>
                                            <div class="buy d-flex justify-content-between align-items-center mt-4">
                                                <div class="price text-dark fs-home">
                                                    <sup class="fw-bold">$</sup>
                                                    <span class="fw-bold">${clothes.price}</span>
                                                </div>
                                                <div class="btn-buy">
                                                    <a href="#" class="btn btn-dark fs-card agregarElem" id="${clothes.id}"><i class="bi bi-bag-check me-1"></i> Add to cart</a>
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
</div>
    `
}


const listCarrito = (elem) => {
    return `
    <li class="row li-elements d-flex align-items-center">
        <div class="col-lg-1 col-2 info-principal ">
            <img class="card-img col-lg-2 col-2" src="${elem.image}" alt="${elem.title}" > 
        </div>
        <div class="col-lg-2 col-10 container-title">
            <span class="fs-4 text-center">${elem.title}</span>
        </div> 
        <div class="col-lg-2 col-6 mt-lg-0 mt-3  d-none d-flex justify-content-center">
            <div class="fs-5 box-color ${elem.color}" id="color"></div>
        </div>
        <div class="col-lg-2 col-6 d-none mt-3">
            <span class="fs-5 ${elem.size}" id="talle">${elem.size}</span>
        </div>
        <div class="col-lg-4 col-6 text-start ps-lg-5 mt-3">
            <span class="fs-5 ms-4">$${elem.price}</span>
        </div>
        <div class="col-lg-3 info-secundaria col-6 d-flex-btn mt-2" id="${elem.id}">  
            <span id="cant" class="">${elem.cant}</span>
        </div>
    </li>
    `
}




/* *** Template *** */

const getCoupon = () => {
    const subsBtn = document.getElementById("subs-btn");
    subsBtn.addEventListener("click", () => {
        let inputMail = document.querySelector("#newsletter1");
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


const renderCards = async () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let favDataLS = JSON.parse(localStorage.getItem("fav")) || [];
    let shop1 = await getPr(4, 10)
    let shop2 = await getPr(11, 17)
    let containerCards = document.querySelector('#container-cards-trend')
    let containerCards1 = document.querySelector('#container-cards-unisex')
    let allElems = shop1.concat(shop2);
    renderCarrito(carritoDataLS)

    containerCards.innerHTML = ""
    containerCards1.innerHTML = ""


    shop1.forEach(clothes => {
        containerCards.innerHTML += renderCard(clothes)
    })
    shop2.map(clothes => {

        containerCards1.innerHTML += renderCard(clothes)
    })


    addOpcColorTalle()
    addCarrito(carritoDataLS, allElems)
    addFav(containerCards, containerCards1)
    renderBtnFav(favDataLS, containerCards)
    renderBtnFav(favDataLS, containerCards1)
    getCoupon();
}

//renderizo todos los productos
const renderProducts = async () => {
    //renderBtnCarrito()

    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let favDataLS = JSON.parse(localStorage.getItem("fav")) || [];
    let container = document.querySelector("#container-cards")
    let data = await getAllArticles();
    renderCarrito(carritoDataLS)
    let cantElem = container.childElementCount;

    if (cantElem != 0 && container != null) {
        container.innerHTML = "";
    }
    data.forEach(element => {
        container.innerHTML += renderCard(element)

    });
    addOpcColorTalle()
    addCarrito(carritoDataLS, data)
    obtPriceTotal(carritoDataLS);
    addFav(container)
    renderBtnFav(favDataLS, container);
}
const renderFavorites = async () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let favDataLS = JSON.parse(localStorage.getItem("fav")) || [];
    let data = await getAllArticles();
    let container = document.querySelector("#container-cards");
    container.innerHTML = "";
    favDataLS.forEach(element => {
        if (element != null) {
            container.innerHTML += renderCard(element)
        }
    });
    addOpcColorTalle()
    addCarrito(carritoDataLS, data)
    //renderBtnCarrito()
    renderBtnFav(favDataLS, container);
    addFav(container)
}
const renderRecomendItems = async () => {
    let favDataLS = JSON.parse(localStorage.getItem("fav")) || [];
    let data = await getAllArticles();
    let categories = data.map(elem => elem.category);
    categories = [...new Set(categories)];
    let recomendItem = []
    let containerFavorites = document.querySelector("#container-cards");
    let cantElem = favDataLS.length;
    for (let i = 0; i < 4; i++) {
        let randomCategory = categories[Math.floor(Math.random() * categories.length)];
        let randomItem = data.filter(elem => elem.category == randomCategory)[Math.floor(Math.random() * data.filter(elem => elem.category == randomCategory).length)];
        if (!favDataLS.some(item => item.id === randomItem.id)) {
            if (!recomendItem.includes(randomItem) && recomendItem.length < 4) {
                recomendItem.push(randomItem)
                //cantElem--;

            }
        }
        if (recomendItem.length < 4 && cantElem < (data.length - 4)) {
            i--;
        }

    }
    let container = document.querySelector("#recomend-items");
    container.innerHTML = "";
    recomendItem.forEach(elem => {
        container.innerHTML += renderCard(elem)
    })
}

const addOpcColorTalle = () => {
    let btnModal = document.querySelectorAll(".btn-showData");
    btnModal.forEach(elem => {
        elem.addEventListener("click", () => {
            eventOpc()
        })
    })

}

const eventOpc = () => {
    let opcColor = document.querySelectorAll(".box-color");
    let opcSize = document.querySelectorAll(".box-talle");
    opcColor.forEach(elem => {
        elem.addEventListener("click", () => {
            opcColor.forEach(elem => {
                elem.classList.remove("checked")
            })
            elem.classList.add("checked")
        })
    })

    opcSize.forEach(elem => {
        elem.addEventListener("click", () => {
            opcSize.forEach(elem => {
                elem.classList.remove("checked")
            })
            elem.classList.add("checked")
        })
    })
}
const addCarrito = (carritoDataLS, data) => {
    let btn = document.querySelectorAll(".agregarElem")
    btn.forEach(elem => {
        elem.addEventListener("click", () => {
            insertarPrCarrito(carritoDataLS, data, elem.id)
        })
    })
}

const addFav = (cont, cont2 = '') => {
    let btn = document.querySelectorAll(".agregarFav")

    btn.forEach(elem => {
        elem.addEventListener("click", () => {
            insertarPrFav(elem.id, cont)

        })
    })
}
const insertarPrFav = async (id, cont, cont2 = '') => {
    let data = await getAllArticles();
    let favData = JSON.parse(localStorage.getItem("fav")) || [];
    if (cont2 != '') {
        let cn2 = cont2;
    }
    let prod = data.find(elem => elem.id == id)
    let prodFav = favData.find(elem => elem.id == id);
    if (!prodFav) {
        favData.push(prod);
        if (cont2 !== '') {
            renderBtnFav(favData, cont2);
        } else {
            renderBtnFav(favData, cont);
        }
    } else {
        favData = favData.filter(elem => elem.id != id);
        if (cont2 !== '') {
            renderBtnFav(favData, cont2);
        } else {
            renderBtnFav(favData, cont);
        }
    }
    localStorage.setItem("fav", JSON.stringify(favData));
    if (cont2 !== '') {
        renderBtnFav(favData, cont2);
    } else {
        renderBtnFav(favData, cont);
    }
    //renderBtnCarrito();
    nav();
};


const renderBtnFav = (fav, container) => {
    let btnFav = container.querySelectorAll(".agregarFav")
    btnFav.forEach(element => {
        if (fav.find(elem => elem.id == element.id)) {
            element.classList.add("text-danger")
        } else {
            element.classList.remove("text-danger")
            element.classList.add("bi-heart-fill")
        }
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
    } else {
        carritoData.innerHTML = `<p><img src="./assets/cart_empty.png" alt="Cart empty" class="mb-2 rounded-3 w-empty"</img></p>`;
        carritoData.innerHTML = `<p><img src="../assets/cart_empty.png" alt="Cart empty" class="mb-2 rounded-3 w-empty"></img></p>`
    }
    cantElementos(cantElem)
    quitarPrCarrito(car)
    agregarUnPrCarrito(car)
    obtPriceTotal(car)

}


const cantElementos = (cantElem) => {
    let numElem = document.querySelector("#cantProd")
    //verifico que exista
    if (numElem != null) {
        numElem.innerHTML = '';
        numElem.innerHTML = cantElem;
    } else {
    }
}
const agregarUnPrCarrito = (car) => {
    let btnAgregar = document.querySelectorAll(".agregarUno")

    btnAgregar.forEach(elem => {
        elem.addEventListener("click", () => {
            let spanCant = elem.parentElement.querySelector("#cant")
            let id = elem.parentElement.id;
            let opcColor = elem.parentElement.parentElement.querySelector("#color").classList[2];

            let opcSize = elem.parentElement.parentElement.querySelector('#talle').classList[1];
            console.log(opcSize);
            let carritoData = car.find(elem => (elem.id == id) && (elem.color == opcColor) && (elem.size == opcSize))
            if (carritoData) {
                carritoData.cant += 1;
            }
            spanCant.innerHTML = carritoData.cant;
            obtPriceTotal(car)
        })
    })
}

const quitarPrCarrito = (car) => {
    let btnQuitar = document.querySelectorAll(".elimProd")
    let btnVaciar = document.querySelector(".vaciarCarrito")
    //obtengo carritoData del localStorage


    btnQuitar.forEach(elem => {
        elem.addEventListener("click", () => {
            let id = elem.parentElement.id;
            let opcColor = elem.parentElement.parentElement.querySelector("#color").classList[2];
            let opcSize = elem.parentElement.parentElement.querySelector('#talle').classList[1];

            let carritoData = car.find(elem => (elem.id == id) && (elem.color == opcColor) && (elem.size == opcSize))
            if (carritoData && carritoData.cant > 0) {
                carritoData.cant -= 1;
                if (carritoData.cant == 0) {
                    car.forEach((elem) => {
                        if (elem.id == id && elem.color == opcColor && elem.size == opcSize) {
                            car.splice(car.indexOf(elem), 1)
                        }
                    })
                }
            }
            localStorage.setItem("carritoData", JSON.stringify(car))
            nav();
        })
    })

    btnVaciar.addEventListener("click", () => {
        if (car.length > 0) {
            localStorage.removeItem("carritoData");
            nav();

        }
    })


}

const insertarPrCarrito = (car, data, id) => {
    obtProducto(car, data, id)
    renderCarrito(car);
}

const obtPriceTotal = (car) => {
    let priceTotal = document.querySelector(".priceTotal")
    let total = 0;
    car.forEach(elem => {
        total += elem.price * elem.cant
    })
    total = total.toFixed(2);
    priceTotal.innerHTML = `$${total}`;
}
const obtProducto = (car, data, id) => {
    let carritoData = car;
    let prod = data.find(elem => elem.id == id)
    let opcColor = document.querySelector('.opt-colors .checked').getAttribute("value");
    let opcSize = document.querySelector('.opt-talles .checked').innerHTML;
    let prodCarrito = carritoData.find(elem => (elem.id == id) && (elem.color == opcColor) && (elem.size == opcSize))
    if (prodCarrito) {
        prodCarrito.cant += 1;
    } else {
        prodCarrito = {
            id: prod.id,
            title: prod.title,
            price: prod.price,
            image: prod.image,
            cant: 1,
            color: opcColor,
            size: opcSize
        }
        carritoData.push(prodCarrito)
    }
    localStorage.setItem("carritoData", JSON.stringify(carritoData))
    renderCarrito(car);
}

const renderResume = () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let arrImg = [];
    renderCarrito(carritoDataLS)
    let elemsCarritoSec = document.querySelectorAll(".li-elements");
    elemsCarritoSec.forEach(elem => {
        let infoPrinc = elem.querySelector(".info-principal");
        let infoSec = elem.querySelector(".info-secundaria");
        let allStyleClasOfElem = elem.querySelectorAll(' [class^="col-lg-"]')
        allStyleClasOfElem.forEach(elem => {
            elem.classList.remove(elem.classList[0])
            elem.classList.remove("d-none")
            if (elem.classList.contains("info-principal")) {
                elem.classList.add("col-lg-1")
            } else if (elem.classList.contains("container-title")) {
                elem.classList.add("col-lg-3")
            } else {
                elem.classList.add("col-lg-2")
            }
        })
        let infoTitle = elem.querySelector(".container-title");
        infoSec.insertAdjacentHTML("afterbegin",
            `
            <button class=" btn-prod-carrito elimProd bg-danger">
                <i class="bi bi-dash"></i>
            </button>
            `
        );
        infoSec.insertAdjacentHTML("beforeend",
            `
            <button class=" btn-prod-carrito agregarUno bg-success">
                <i class="bi bi-plus "></i>
            </button>
            `
        );
    })
    quitarPrCarrito(carritoDataLS)
    agregarUnPrCarrito(carritoDataLS)
    obtPriceTotal(carritoDataLS)
    btnCoupon();
}


const renderFilter = async () => {
    let products = await getAllArticles();
    let productCategories = new Set();
    products.forEach(element => {
        if (!productCategories.has(element.category)) {
            productCategories.add(element.category);
        };
    });
    insertCheckbox(productCategories);
    renderVisibleCards();
    searchFilter();
    checkFilter();
    optionFilter();
    //filterButton();
    //searchFilter();
};

// SHOP SECTION 
// Filters
// CheckBox Filters
const insertCheckbox = (categories) => {
    let checksCtn = document.querySelector('.check-opt');
    let selectForm = document.querySelector('.form-select')
    categories.forEach((category) => {
        if (checksCtn.childNodes.length < 15) {
            checksCtn.insertAdjacentHTML("beforeend", elemCheck(category));
            selectForm.insertAdjacentHTML("beforeend", elemOption(category));
        }

    })
}

var categoriesChecked = [];
const optionFilter = () => {
    let formSelect = document.querySelector('.form-select');

    formSelect.addEventListener("change", () => {
        let allCards = [...document.querySelectorAll(".card-ctn")];

        const inputOption = document.querySelectorAll(".option-input");
        inputOption.forEach((option) => {
            option.selected
                ? categoriesChecked.push(option.value)
                : null
        });
        cardsFilter(categoriesChecked);
        noSelect(categoriesChecked);

        const unHiddenCards = allCards.filter(card => !card.classList.contains('hidden'));
        searchFilter(unHiddenCards);
    });
};

var visibleCards = new Set();
var categoriesChecked = [];

const checkFilter = () => {
    const containerChecks = document.querySelector('.check-opt');

    containerChecks.addEventListener("change", () => {

        const inputsCheckbox = document.querySelectorAll(".form-check-input");
        categoriesChecked = [];

        inputsCheckbox.forEach((inputBox) => {
            inputBox.checked
                ? categoriesChecked.push(inputBox.value)
                : null
        });
        //categoriesChecked = categoriesChecked.filter(check => check !== inputBox.value)
        console.log("categoriesChecked", categoriesChecked)
        cardsFilter(categoriesChecked);
        noSelect(categoriesChecked);

    });
};
const cardsFilter = (arrChecked) => {
    const allCards = [...document.querySelectorAll(".card-ctn")];

    allCards.forEach((card) => {
        if (arrChecked.includes(card.getAttribute("data-category"))) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

};

const noSelect = (arrChecked) => {
    const allCards = document.querySelectorAll(".card-ctn");
    arrChecked.length === 0
        ? allCards.forEach((card) => {
            card.classList.remove("hidden")
        })
        : null
};

// CheckBox elements
const elemCheck = (event) => {
    return `
            <div class="col-6 col-lg-12" >
                 <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" value="${event}" id="flexCheck" >
                    <label class="form-check-label text-capitalize" for="flexCheckDefault">
                         ${event}
                    </label>
                 </div>
             </div>
             `
};

const elemOption = (event) => {
    return `
    <option class="option-input text-capitalize" value="${event}">${event}</option>
     `
};

const renderVisibleCards = () => {
    let allCards = [...document.querySelectorAll(".card-ctn")];
    if (categoriesChecked.length === 0) {

        allCards.forEach((card) => {
            if (!card.classList.contains('hidden')) {
                visibleCards.add(card);
            } else { visibleCards.delete(card) }
        });

    }
};

// Input Search Filter
/* const mixedFilter = () =>{
    const allCards = document.querySelectorAll(".card-ctn");

    allCards.forEach(card =>{
        if(searched.length !== 0){
            if (title.includes(searched) && categoriesChecked.includes( card.getAttribute("data-category" ))) {
                
            }
        } else {
            checkFilter();
        }
    })
} */

const searchFilter = () => {
    const inputSearchEvents = document.getElementById("input-search-events");

    inputSearchEvents.addEventListener("input", (event) => {
        inputEvent = event.target.value.toLowerCase()
        console.log("inputEvent", inputEvent.length === 0)

        visibleCards.forEach(card => {
            let title = card.querySelector(".card-title").textContent.toLowerCase();
            if (title.includes(event.target.value.toLowerCase())) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
        noResultFilter()
    });
};

const noResultFilter = () => {
    let allCards = document.querySelectorAll(".card-ctn");
    const emptyCardContainer = document.getElementById("emptyContainer");
    let noResultsCard = ``;

    let hiddenCards = document.querySelectorAll(".hidden");
    if (hiddenCards.length === allCards.length) {
        noResultsCard += `
            <div class="container text-center">
                <div style="width: 250px; margin: 0 auto">
                    <img style="width: 100%;" src="../assets/not_found.png" alt="not_found">
                </div>
                <p>Please try another search!</p>
            </div>
            `
    }

    emptyCardContainer.innerHTML = noResultsCard;
};

// Input Search Filter Button 
/* const filterButton = () =>{
    const searchFilterButton = document.getElementById("input-search-button");
    searchFilterButton.addEventListener("click", (e) =>{
        e.preventDefault();
    }); 
} */

//CONTACT

const contactBtnAlert = () =>{
    var contactForm = document.getElementById("contactForm");
    const contactBtn = document.querySelector(".contactBtn");
    contactBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        contactAlert();
        contactForm.reset();
    })
}

function contactAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your message has been sent',
        showConfirmButton: false,
        timer: 2000
    })
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
    for (var i = 0; i < length; i++) {
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
        background: 'url(../assets/bg-cupon.gif)',
    })
}

//RESUME
// Discount function
function btnCoupon() {
    const cuponBtn = document.getElementById("cupon-btn");
    cuponBtn.addEventListener("click", (event) => {
        let coupon = document.querySelector(".input-coupon");
        applyDiscount(coupon.value);
    })
}
//btnCoupon();

function applyDiscount(coupon) {
    let discountApplied = false;
    if (!discountApplied && coupon.trim() == localStorage.getItem('code10').trim()) {
        let priceTotal = document.querySelector(".priceTotal")
        let total = Number(priceTotal.innerHTML.slice(1)) - Number(priceTotal.innerHTML.slice(1)) * 0.1;
        priceTotal.innerHTML = ``;
        priceTotal.innerHTML = `$${total}`;
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

// FINISH SHOPPING PAGE --------------------

//Get input info-----------
//Card Number, input 1
const getNumbI1 = () => {
    let inputCard1 = document.getElementById("card-numb-1")
    inputCard1.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-1")
        renderCardNumb1(cardNumber.value)
    })
}

//Card Number, input 2
const getNumbI2 = () => {
    let inputCard2 = document.getElementById("card-numb-2")
    inputCard2.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-2")
        renderCardNumb2(cardNumber.value)
    })
}

//Card Number, input 3
const getNumbI3 = () => {
    let inputCard3 = document.getElementById("card-numb-3")
    inputCard3.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-3")
        renderCardNumb3(cardNumber.value)
    })
}

//Card Number, input 4
const getNumbI4 = () => {
    let inputCard4 = document.getElementById("card-numb-4")
    inputCard4.addEventListener("keyup", () => {
        let cardNumber = document.querySelector("#card-numb-4")
        renderCardNumb4(cardNumber.value)
    })
}

//Card Holder
const getCardHolder = () => {
    let cardHolder = document.getElementById("card-holder-input")
    cardHolder.addEventListener("keyup", () => {
        let cardName = document.querySelector("#card-holder-input")
        //console.log("cardName", cardName.value)
        renderCardHolder(cardName.value)
    })
}

//Expiration Date
const getExpirationMonth = () => {
    let expDateMonth = document.getElementById("exp-date-m")
    expDateMonth.addEventListener("keyup", () => {
        let month = document.querySelector("#exp-date-m")
        renderExpMonth(month.value)
    })
}

const getExpirationYear = () => {
    let expDateYear = document.getElementById("exp-date-y")
    expDateYear.addEventListener("keyup", () => {
        let year = document.querySelector("#exp-date-y")
        renderExpYear(year.value)
    })
}

//CVV
const getCVV = () => {
    const inputCVV = document.getElementById("input-CVV")
    inputCVV.addEventListener("keyup", () => {
        let cvv = document.querySelector("#input-CVV")
        renderCVV(cvv.value)
    })
}


//Render input info--------
//Card Number, input 1
const renderCardNumb1 = (value) => {
    let divNumbers = document.getElementById("numbers-1")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 2
const renderCardNumb2 = (value) => {
    let divNumbers = document.getElementById("numbers-2")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 3
const renderCardNumb3 = (value) => {
    let divNumbers = document.getElementById("numbers-3")
    divNumbers.innerHTML = `${value}`
}

//Card Number, input 4
const renderCardNumb4 = (value) => {
    let divNumbers = document.getElementById("numbers-4")
    divNumbers.innerHTML = `${value}`
}

//Card Holder
const renderCardHolder = (value) => {
    let cardHolder = document.getElementById("card-holder")
    cardHolder.innerHTML = `${value.toUpperCase()}`
}

//Expiration date
const renderExpMonth = (value) => {
    let month = document.getElementById("exp-month")
    month.innerHTML = `${value}`
}

const renderExpYear = (value) => {
    let year = document.getElementById("exp-year")
    year.innerHTML = `${value}`
}

//CVV
const renderCVV = (value) => {
    let cvv = document.getElementById("number-cvv")
    cvv.innerHTML = `${value}`
}

//Payment confirmation-------
const payBtn = () => {
    const payBtn = document.getElementById("pay-btn");
    
    payBtn.addEventListener("click", () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your purchase has been made successfully!',
            showConfirmButton: false,
            timer: 3000
        })
        //limpio el carrito 
        localStorage.removeItem("carritoData")
        nav()
    })
}


const renderFinishop = () => {
    getNumbI1()
    getNumbI2();
    getNumbI3();
    getNumbI4();
    getCardHolder();
    getExpirationMonth()
    getExpirationYear()
    getCVV()
    payBtn()
}
const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || []
    renderBtnCarrito();
    switch (URLactual) {
        case 'index.html':
            renderCards()
            renderCarrito()
            break;
        case 'resume.html':
            renderCarrito()
            renderResume()
            break;
        case 'shop.html':
            renderProducts()
            renderFilter()
            renderCarrito(carritoDataLS)
            break;
        case 'contact.html':
            renderProducts()
            contactBtnAlert()
        break;
        case 'favorites.html':
            renderRecomendItems()
            renderFavorites()
            renderCarrito(carritoDataLS)
            break;
        case 'finishop.html':
            renderFinishop()
            renderCarrito(carritoDataLS)
            break;

        case 'login.html':
            renderLoginEmail();
            renderSignUpGoogle();
            renderSignUpFacebook();

            break;
        case 'sign_up.html':
            renderSignUp();
            renderSignUpGoogle();
            renderSignUpFacebook();

            break;
        default:
            renderProducts()
            renderCards()
            break;
    }
}
nav();
