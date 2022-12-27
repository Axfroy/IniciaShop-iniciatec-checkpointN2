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
        <li id="${elem.id}" class="li-elements">
            <div class="info-principal">
            
            <span class="">${elem.name}</span>
            <span class="">$${elem.price}</span>
            </div>
            <div class="info-secundaria">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                <span id="cant" class="">${elem.cant}</span>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                </svg>

            </div>

   <span class="">${elem.name}</span>
   <span class="">$${elem.price}</span>
   </div>
   <div class="info-secundaria">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
       </svg>
       <span id="cant" class="">${elem.cant}</span>

       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
       </svg>

   </div>

</li>
    `
}

//renderizo todos los productos
const renderProducts = async () => {
    //json // undefined 
    let carritoDataLS = JSON.parse(localStorage.getItem("carritoData")) || [];
    let btnCarrito = document.querySelector(".btn-carrito")
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
const renderCarrito = (car = []) => {

    let carritoData = document.querySelector(".list-carrito")
    //  console.log(carritoData);
    let numElem = document.querySelector("#cantProd")
    console.log(numElem);
    let cantElem = 0;

    carritoData.innerHTML = "";
    car.forEach(elem => {
        cantElem += elem.cant;
       // console.log(elem);
        carritoData.innerHTML += listCarrito(elem)

        //quito del carrito
    })

    console.log(cantElem);
    //inserto cantidad de elementos en numElem
    numElem.innerHTML = '';
    numElem.innerHTML = cantElem;

    let total = document.querySelector(".total")


    quitarPrCarrito(car)
    obtPriceTotal(car)

}


const quitarPrCarrito = (car) => {
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
    //traigo el carrito
    let carritoData = document.querySelector(".list-carrito")
    //obtengo el id de cant de productos
    let numElem = document.querySelector("#cantProd")
    //console.log(numElem);
    let cantElem = 0;
    let arrImg = [];
    carritoData.innerHTML = "";
    car.forEach(elem => {
        //creo etiqueta img
        arrImg.push(elem.img);
        cantElem += elem.cant;
        carritoData.innerHTML += listCarrito(elem)
        
        
    })
    let elemsInfPrinc = document.getElementsByClassName("info-principal");
    // itero sobre los elementos
    console.log(arrImg);
    for (let i = 0; i < elemsInfPrinc.length; i++) {
        let img = document.createElement("img");
        img.src = arrImg[i];
        //agrego la imagen
        elemsInfPrinc[i].insertAdjacentElement("afterbegin", img);
    } 
    
    quitarPrCarrito(car)
    obtPriceTotal(car)
    
}




const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();

    switch (URLactual) {
        //envio el getAllEvents
        case 'index.html':
            renderProducts();
            break;

        case 'resume.html':
            renderResume(elms)

        break;

        default:
            //insert 404
            renderProducts();

            break;

    }
}
nav();
//renderCarrito(elms)
