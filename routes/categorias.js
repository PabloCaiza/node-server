const {Router} = require('express')
const {check} = require('express-validator')
const {validarJwt, validarCampos, tieneRole, esAdminRole} = require("../middlewares");
const {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, borarCategoria
} = require("../controllers/categorias");
const {existeCategoria, esRoleValido} = require("../helpers/db-validators");

const router = Router()
//obtener todas las categorias-publico
router.get('/', obtenerCategorias)
//obtener una categoria por id-publico
router.get('/:id',
    [
        check('id', 'tiene que ser un id de mongo').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos]
    , obtenerCategoria)
//crear categoras -privado -cualqquier persona con un token valido
router.post('/',
    [validarJwt,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        validarCampos],
    crearCategorias
)
//atualizar -privado -cualquiera con token valido
router.put('/:id',
    [validarJwt,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('id', 'tiene que ser un id de mongo').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos

    ],
    actualizarCategoria)
//borar una categoria-Admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos

], borarCategoria)


module.exports = router