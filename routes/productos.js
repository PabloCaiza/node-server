const {Router} = require('express')
const {check} = require('express-validator')
const {validarJwt, validarCampos, esAdminRole} = require("../middlewares");
const {existeCategoria, existeProducto} = require("../helpers/db-validators");
const {obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borarProducto} = require("../controllers/productos");

const router = Router()
//obtener todas las categorias-publico
router.get('/', obtenerProductos)
//obtener una categoria por id-publico
router.get('/:id',
    [
        check('id', 'tiene que ser un id de mongo').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos]
    , obtenerProducto)
//crear categoras -privado -cualqquier persona con un token valido
router.post('/',
    [validarJwt,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('categoria', 'Tiene que ser un id de mongo').isMongoId(),
        check('categoria').custom(existeCategoria),
        validarCampos],
    crearProducto
)
//atualizar -privado -cualquiera con token valido
router.put('/:id',
    [validarJwt,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('categoria', 'Tiene que ser un id de mongo').isMongoId(),
        check('categoria').custom(existeCategoria),
        check('id', 'tiene que ser un id de mongo').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos

    ],
    actualizarProducto)
//borar una categoria-Admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos

], borarProducto)


module.exports = router