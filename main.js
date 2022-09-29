//Clase constructora
class Prenda {
    constructor(id, articulo, color, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.articulo = articulo,
        this.color = color,
        this.precio = precio,
        this.imagen = imagen
    }
    //métodos
    mostrarData(){
   }
}

//Instanciación de objetos -- respetamos orden y cantidad de atributos

const prenda1 = new Prenda(1,"Campera de Jean","azul", 5000, "camperaJean.png")

const prenda2 = new Prenda(2,"Cartera de ecocuero","Violeta", 4500, "cartera.png")

const prenda3 = new Prenda(3,"Pantalon de Jeans", "Celeste", 3500, "jeans.png")

const prenda4 = new Prenda(4,"Musculosa Deportiva","Negra", 700, "musculosaNegra.png")

const prenda5 = new Prenda(5,"Remera manga corta", "Roja", 1000, "remeraRoja.png")

const prenda6 = new Prenda(6,"Saquito de hilo", "Rosa", 2000, "sacoRosa.png")

const prenda7 = new Prenda(7,"Cadena con Dijes en forma de Corazon", "Dorado", 2800, "cadenaDije.png")

const prenda8 = new Prenda(8,"Zapatos Carrie", "Azul", 15000, "zapatos.png")


let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []
let carrito = []
//Guardar carrito en el Storage
//Revisa si existe en el local y lo trae 
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
else{
    ("Seteando por primera vez el array")

carrito.push(prenda1, prenda2, prenda3, prenda4, prenda5, prenda6, prenda7, prenda8)
localStorage.setItem("carrito", JSON.stringify(carrito) )
}

let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    
    array.forEach((prenda)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.setAttribute("class", "col")
        nuevoProducto.innerHTML = `<div id="${prenda.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="assets/${prenda.imagen}" alt="${prenda.articulo} de ${prenda.color}">
                                    <div class="card-body">
                                        <h4 class="card-title">${prenda.articulo}</h4>
                                        <p>Color: ${prenda.color}</p>
                                        <p class="">Precio: ${prenda.precio}</p>
                                        <button id="agregarBtn${prenda.id}" class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                    </div>
        </div>`
        divProductos.append(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${prenda.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(prenda)

        })
    })
}

function agregarAlCarrito(prenda){
    productosEnCarrito.push(prenda)
    localStorage.setItem("tienda", JSON.stringify(productosEnCarrito))
}

function botonOcultar(){
    divProductos.innerHTML = ""
} 

// // //function agregar nuevo Producto
// function nuevaPrenda(array){
//     let articuloIngresado = prompt("Ingrese el articulo")
//     let colorIngresado = prompt("Ingrese el color")
//     let precioIngresado = parseInt(prompt("Ingrese el precio"))
//     let prendaCreada = new Prenda (carrito.length+1, articuloIngresado, colorIngresado, precioIngresado)
//     array.push(prendaCreada)
    
// }

//function nuevaPrenda actualiza a inputs!
function nuevaPrenda(array){
    let articuloInput = document.getElementById("articuloInput")
    let colorInput = document.getElementById("colorInput")
    let precioInput = document.getElementById("precioInput")
    let prendaCreada = new Prenda (array.length+1, articuloInput.value, colorInput.value, parseInt(precioInput.value), "nuevaImagen.jpg")
    array.push(prendaCreada)
    //Actualizamos Storage
    localStorage.setItem("carrito", JSON.stringify(array))

    //Provisorio resetear form
    articuloInput.value = ""
    colorInput.value = ""
    precioInput.value = ""
    mostrarCatalogo(array)
}

//btnGuardar adjuntamos evento
let btnGuardar = document.getElementById("botonAgregar")
btnGuardar.addEventListener("click", ()=>{
    nuevaPrenda(carrito)
})

//BtnMostrarCatalogo adjuntamos evento
let btnMostrarCatalogo = document.getElementById("botonMostrar")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(carrito)
})

//Boton ocultar catalogo adjuntamos evento
let btnOcultarCatalogo = document.getElementById("botonOcultar")
btnOcultarCatalogo.onclick = botonOcultar

//DOM CARRITO
let botonCarrito = document.getElementById("btnCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById("precioTotal")
// let btnCarrito = document.getElementById("btnCarrito")

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){

    // modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{

        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
            </div>    
        
        
        </div>
`

    })
    //calcular el total
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    if(acumulador == 0){
        parrafoCompra.innerHTML = `<strong>No hay productos en el carrito</strong>`
    }
    else{
        parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`
    }
}