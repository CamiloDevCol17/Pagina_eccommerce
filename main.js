// variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaZapato = document.querySelector('#lista-zapatos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    // cuando agregas un zapato presionando"agregar al carrito"
    listaZapato.addEventListener('click', agregarZapato)
    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarProducto)

    // vaciar carrito

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito=[] //resetiamos el arreglo
        limpiarHtml()//eliminamos todo del HTML 
        
    })
}


//funciones 
function agregarZapato(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = (e.target.parentElement.parentElement)
        leerDatos(productoSeleccionado)
    }
}
function agregarAlCarrito2() {
    // Obtener información del producto
    var nombreProducto = document.querySelector('.info-card h4').textContent;
    var precioProducto = document.querySelector('.info-card .precio').textContent;
  
    // Crear elemento para representar el producto en el carrito
    var nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('producto');
    nuevoProducto.innerHTML = '<span class="nombre">' + nombreProducto + '</span><span class="precio">' + precioProducto + '</span>';
  
    // Agregar el nuevo producto al carrito
    document.querySelector('.carrito').appendChild(nuevoProducto);
  }
  
  // Agregar evento click al botón "Agregar al carrito"
  document.querySelector('.agregar-carrito').addEventListener('click', agregarAlCarrito);
  
function agregarProducto(){

  // Seleccionar el botón "Agregar al carrito"
  var botonAgregar = document.querySelector('.agregar-carrito');

  // Agregar un listener para el evento "click"
  botonAgregar.addEventListener('click', function(evento) {
    evento.preventDefault();

    // Obtener el ID del producto desde el atributo "data-id"
    var idProducto = botonAgregar.getAttribute('data-id');

    // Obtener información del producto (nombre, precio, etc.)
    var nombreProducto = "Addidas Deportivos";
    var precioProducto = 250000;

    // Crear un objeto que represente el producto
    var producto = {
      id: idProducto,
      nombre: nombreProducto,
      precio: precioProducto,
      cantidad: 1
    };

    // Agregar el producto al carrito
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar un mensaje de confirmación al usuario
    alert("El producto se agregó al carrito.");
  });
}

// elimiar un producto del carrito

function eliminarProducto(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id')
        // elimina del arreglo de articulosCarrito por el data-Id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        console.log(articulosCarrito)
        carritoHtml()//
    }
}

// del contenido HTML al que dimos click y extraer la inf. del zapato

function leerDatos(producto) {
    // console.log(producto)

    // crear un objeto con el contenido del curso actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisar si un elemento existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)
    if(existe){
        // actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++
                return producto
            }else {
                return producto
            }
            
        })
        articulosCarrito= [...productos]
    }else {
        // agregamos el curso al carrito
        // agregar elemento al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto]
        
    }
    console.log(articulosCarrito)
    

    carritoHtml()
}

// muestra el carrito de compra en el HTMl

function carritoHtml() {
    // limpiar HTML
    limpiarHtml()
    articulosCarrito.forEach(producto => {
        const {imagen, nombre, precio, cantidad, id}= producto
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${imagen}" width="60"></td>
        <td>${nombre} </td>
        <td> ${precio}  </td>
        <td> ${cantidad}  </td>
        <td> 
        <a href="#" class="borrar-producto" data-id="${id}"> X </a>
        </td>
        `
        // agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}
 
// eliminar los prodctos del tbody
function limpiarHtml(){
    // contenedorCarrito.innerHTML=''
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


