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
        console.log(error);
    }


}

/* *** Template *** */

const cardProducto = (elem) => {
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
}


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

//renderizo todos los productos
const renderProducts = async () => {
    renderBtnCarrito()
    //json // undefined 
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
   
    let container = document.querySelector("#container-cards")
    let data = await getAllArticles();
    let btn;
    //toggle carrito
    

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
    let numElem = document.querySelector("#cantProd")
    let cantElem = 0;
    if (car.length != 0) {
        carritoData.innerHTML = "";
        car.forEach(elem => {
            //arrImg.push(elem.img);
            cantElem += elem.cant;
            // console.log(elem);
            carritoData.innerHTML += listCarrito(elem)
        })
        let elemsInfPrinc = document.getElementsByClassName("info-principal");
    }else{
        carritoData.innerHTML = "";
        carritoData.innerHTML = `<h2 class="no-product">no hay productos</h2>`
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
const renderResume = () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let arrImg = [];

   //inserto datos
   renderCarrito(carritoDataLS)

   //obtengo todos los elementos del carrito
    let elemsCarritoSec = document.querySelectorAll(".li-elements");
    console.log();


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

    
    

    
}




const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();

    switch (URLactual) {

        case 'index.html':
            renderProducts();
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
            renderProducts();

            break;

    }
}
nav();
//renderCarrito(elms)
