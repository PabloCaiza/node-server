const jwt = require('jsonwebtoken')
const {response, request} = require("express");
const Usuario=require('../models/usuario')


const validarJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid);
        if(!usuario)return res.status(401).json({msg:'Token no valido- usuario no existente'})
        //verificar si el uid tiene estado true
        if(!usuario.estado)return res.status(401).json({msg:'Token no valido- usuario con estado false'})
        req.usuario= usuario
        next()
    } catch (error) {
        res.status(401).json({
            msg:'Token no valido'
        })

    }
}

module.exports = {
    validarJwt
}