
const usuariosGet = (req, res ) => {

    const params=req.query
    res.json({
        msg: 'get API controlador',
        params
    })

}

const usuariosPut = (req, res) => {
    const {id}=req.params
    res.json({
        msg: 'put API controlador',
        id
    })

}

const usuariosPost = (req, res) => {
    const body=req.body
    res.status(201).json({
        msg: 'post API controlador',
        body
    })

}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API controlador'
    })

}
const usuariosPatch=(req, res) => {
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