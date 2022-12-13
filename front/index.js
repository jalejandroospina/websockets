
const btEnviar = document.getElementById('enviar');
const form = document.getElementById('form');

const nombre = document.getElementsByName('nombre');
const precio = document.getElementsByName('precio');
const imagen = document.getElementsByName('imagen');
const tabla  = document.getElementById('tabla');

btEnviar.addEventListener('click', (e)=>
{
        e.preventDefault();

        const producto = 
    {
        nombre : nombre.value,
        precio : precio.value,
        imagen : imagen.value
    }

    return fetch('http://localhost:8080/productos',
        {
            method : 'POST',
            mode : 'cors',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

})

        const socket = io('http://localhost:8080');

    //recibe el producto creado y renderiza en la tabla
    socket.on ('productos', data => //catchear evento de socket y guardar datos
    {
        const productos = data.map((producto,index) =>{
            return `
            <tr>
                <th scope='row'> ${producto.id} </th>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td> <img src="${producto.imagen}" alt="image" width="50px" height="50px"> </td>
            </tr>
            `
        }). join('')  

        tabla.innerHTML =  productos;
    });

    //rebe losp rouctos creados y actualiza latabla
socket.on('nuevoProducto', data => {

    const producto = `
        <tr>
            <th scope='row'> ${data.id} </th>
            <td>${datanombre}</td>
            <td>${data.precio}</td>
            <td> <img src="${data.imagen}" alt="image" width="50px" height="50px"> </td>
        </tr>
        `
        tabla.innerHTML +=  producto;
    })

    
    

   