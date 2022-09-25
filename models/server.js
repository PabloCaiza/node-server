const express = require('express')
const cors = require('cors')
const {dbConnection} = require("../database/config");

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar:'/api/buscar'
        }
        //Conectar a base de datos
        this.conectarDb()

        this.middleware()
        this.routes()

    }


    async conectarDb() {
        await dbConnection()
    }


    routes() {

        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
    }

    listen() {
        this.app.listen(this.port)
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }


}

module.exports = Server