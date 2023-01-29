class Producto {
    constructor(id, nombre, talle, precio, img) {
        this.id = id;
        this.nombre = nombre; 
        this.talle = talle;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const remeras = new Producto(1, "Remeras", "M", 2500, "img/remeras.jpg");
const conjuntos = new Producto(2, "Conjuntos", "M", 1700, "img/conjuntos.jpg");
const buzos = new Producto(3, "Buzos", "L", 3500, "img/buzos.jpg");
const zapatillas = new Producto(4, "Zapatillas", 38, 7900, "img/zapatillas.jpg");


//Creamos un Array con todo nuestro catálogo de productos: 

const productos = [remeras, conjuntos, buzos, zapatillas];

//Creamos el array carrito 

let carrito = [];

/*** CARGAR CARRITO DESDE EL LOCALSTORAGE: ***/
//Si hay algo en el localStorage, lo cargamos en el carrito. 
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//console.log(productos);

//Modificamos el DOM mostrando los productos: 

const contenedorProductos = document.getElementById("contenedorProductos");



// Creamos una función para mostrar los productos: 

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
            Swal.fire({
                title: `agregaste ${producto.nombre} al carrito`,
                position: 'top',
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInDown
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutUp
                    animate__faster
                  `
                },
                grow: 'row',
                showConfirmButton: false,
                showCloseButton: true
              })
              
        })
    })
}

//Función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        //Al final de la clase, guardamos en el localStorage. 
        //Trabajamos con el localStorage: 
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();






//MOSTRAR EL CARRITO DE COMPRAS: 

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Función para mostrar el Carrito: 

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}


//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras: 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Función para eliminar todo el carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage. 
    localStorage.clear();
}

//Mostramos mensaje con el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

let key = "3afd571ab278116bc5f2a4db8d2bdf8d";

fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid="+key)
  .then((response) => response.json())
  .then(data=> console.log(data));




//¿Donde podemos llamar a la función calcularTotal()?
//mostrarCarrito
//agregarAlCarrito