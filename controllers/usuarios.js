const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usuariosGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query


    const [total,usuarios]=await Promise.all([Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .skip(+desde)
        .limit(+limite)])

    res.json({
        total,
        usuarios
    })

}

const usuariosPut = async (req, res) => {
    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body
    //TODO: validaar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json({
        msg: 'put API controlador',
        usuario
    })

}

const usuariosPost = async (req, res) => {


    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    //encriptarlla contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    //guardar en db
    await usuario.save()

    res.status(201).json({
        msg: 'post API controlador',
        usuario
    })

}

const usuariosDelete = async (req, res) => {
    const {id}=req.params
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        usuario
    })

}
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API controlador'
    })

}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}