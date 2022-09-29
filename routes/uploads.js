const {Router}=require('express')
const {check}=require('express-validator')

const {validarCampos} = require("../middlewares/validar-campos");
const {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenClaudinary} = require("../controllers/uploads");
const {coleccionesPermitidas}=require('../helpers')
const {validarArchivoSubir} = require("../middlewares");
const router=Router()

router.post('/',[validarArchivoSubir],cargarArchivo)
router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoSubir,
    validarCampos
],actualizarImagenClaudinary)
router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)
module.exports=router