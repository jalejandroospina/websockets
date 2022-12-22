const express = require ('express');
const cors = require('cors');
const {Server: HttpServer} = require('http');
const {Server : IOServer} = require ('socket.io');

const app = express(); // app express y servidores http y socket
const httpServer = new HttpServer (app);
const io = new IOServer(httpServer);





app.use(cors());
app.use(express.json()); //middlewares
app.use(express.urlencoded ({extended : true}));
app.use('/public', express.static('./front'));




const productos=[] // array para guardar los productos

io.on('connection',(socket)=>
{   console.log(`Nuevo cliente conectado`)

    //socket.emit('productos',productos);
})



app.get('/productos',(req, res)=> // get para obtener lista de productos agregados
{
    return res.json(productos);
})


app.post('/productos',(req,res)=> // post para guardar los datos del formulario
{
    const producto = 
    {
        id: productos.length+1,
        nombre : req.body.nombre,
        precio : req.body.precio,
        imagen : req.body.imagen
    }
    productos.push(producto)

    //evento de creacion de nuevo producto para los demas clientes
    io.sockets.emmit('nuevoProducto', producto);

    return res.render('productos', {
        productos: productos.length > 0
      })

    return res.status(201).json(producto);
})

const PORT = 8080;

httpServer.listen(PORT,()=> console.log(`Servidor escuchando en el puerto ${PORT}`));



