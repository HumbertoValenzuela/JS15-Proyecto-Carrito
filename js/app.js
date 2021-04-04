// variables
const carrito = document.querySelector('#carrito');
const listaCursos  = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() { 
     //1- Cuando agregas un curso presionando "Agregar al Carrito"  
    listaCursos.addEventListener('click', agregarCurso);  
     // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso); 
    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        // console.log('vaciar carrito');
        limpiarHTML(); //Eliminar todo el HTML
    })
}

//  Elimina un curso del carrito
function eliminarCurso(e) {    
    //console.log('desde eliminarCurso');
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);
        // console.log(articulosCarrito);
    }
    carritoHTML();//Iterar sobre el carrito y mostrar HTML
}

function agregarCurso(e) {   
    e.preventDefault();    
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

function leerDatosCurso(curso) {
    // console.log(curso);
    const infoCurso = {
        // .outerHTML src
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
     // Revisa si un elemento ya existe en el carrito
    // infoCurso tratar de agregar
    // curso.id los que ya estan en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    // console.log(existe);
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                 curso.cantidad++;
                 return curso;// retorna el objeto actualizado
            }else {
                return curso;//retorna los objetos que no son los duplicados
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        // agregamos el cusro al carrito
        articulosCarrito =[...articulosCarrito, infoCurso];
        // console.log(articulosCarrito);
    }
  
    carritoHTML();
}

//7- Muestra el carrito de compras en el HTML
function carritoHTML() {
    
    //8- Limpiar el HTML
    limpiarHTML();   
    //9- Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
       
        // console.log(curso);
        // destructuring de objetos, extrae valor y crea la variable
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td> 
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </td>           
        `;
       
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);       
    })
}

// Elimina los curso del tbody
function limpiarHTML() {
  
    while (contenedorCarrito.firstChild) {
        // eliminar por referencia. del padre hacía al hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}