const express = require('express')
const cors=require('cors')
const {dbConnection} = require("../database/config");

class Server{

    constructor() {
        this.app=express()
        this.port=process.env.PORT
        this.usuariosPath='/api/usuarios'
        this.authPath='/api/auth'
        //Conectar a base de datos
        this.conectarDb()

        this.middleware()
        this.routes()

    }


    async conectarDb(){
       await dbConnection()
    }


    routes(){

       this.app.use(this.usuariosPath,require('../routes/usuarios'))
        this.app.use(this.authPath,require('../routes/auth'))

    }
    listen(){
        this.app.listen(this.port)
    }

    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }




}
module.exports=Server