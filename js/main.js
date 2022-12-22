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
                        
                            Author: Lean33
*/

//get all articles

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
        <li id="${elem.id}" class="list-group-item d-flex justify-content-between align-items-center">
            <span class="">${elem.name}</span>
            <span class="">$${elem.price}</span>
            <span id="cant" class="">${elem.cant}</span>
            <button type="button" class="btn btn-danger"> quitar </button>

        </li>
    `
}

//renderizo todos los productos
const renderProducts = async () => {
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let btnCarrito = document.querySelector(".iconCarrito")
    let carritoData = document.querySelector(".carritoData")
    let container = document.querySelector(".container-products")
    let data = await getAllArticles();
    let btn;
    //toggle carrito
    btnCarrito.addEventListener("click", () => {
        carritoData.classList.toggle("dsp-none")
    })
    
    //contenedor del carrito
    renderCarrito(carritoDataLS)
    console.log(data);
    data.forEach(element => {
        container.innerHTML += cardProducto(element)

    });
    btn = document.querySelectorAll(".agregarElem")
    btn.forEach(elem => {

        elem.addEventListener("click", () => {
            insertarPrCarrito(carritoDataLS,data, elem.id)
        })
    })
    obtPriceTotal(carritoDataLS);


}
const renderCarrito = (car) => {
  
    let carritoData = document.querySelector(".list-carrito")

    carritoData.innerHTML = "";
    car.forEach(elem => {
        console.log(elem);
        carritoData.innerHTML +=  listCarrito(elem)
        //quito del carrito
    })
   
}


const quitarPrCarrito = (car) => {
    let btnQuitar = document.querySelectorAll(".btn-danger")
    btnQuitar.forEach(elem => {
        elem.addEventListener("click", () => {
            //obtengo id del producto
            let id = elem.parentElement.id;
            //le quito 1 a la cantidad
            let carritoData = car.find(elem => elem.id == id)
            carritoData.cant -= 1;
            //si la cantidad es 0 lo elimino
            if(carritoData.cant == 0){
                car = car.filter(elem => elem.id != id)
            }
            //guardo en localStorage
            localStorage.setItem("carritoData", JSON.stringify(car))

        })
    })
    renderCarrito(car);

}

const insertarPrCarrito = (car, data, id) => {
    renderCarrito(car);

    //obtengo clase carritoData
    obtProducto(car , data, id)
    //inserto desde localStorage
    quitarPrCarrito(car)






}

const obtPriceTotal = (car) => {
    console.log("ENTRAAAAAA TOTAL");
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let priceTotal = document.querySelector(".priceTotal")
    let total = 0;
    carritoDataLS.forEach(elem => {
        total += elem.price * elem.cant
    })
    priceTotal.innerHTML = total;   
}



const obtProducto = (car,data, id) => {

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
                elem.cant +=  1;
            }
        })
    }


    localStorage.setItem("carritoData", JSON.stringify(carritoData))

    renderCarrito(car); 

}





const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();

    switch (URLactual) {
        //envio el getAllEvents
        case 'index.html':
            renderProducts();
        break;


        default:
            //insert 404
            renderProducts();

        break;

    }
}
nav();