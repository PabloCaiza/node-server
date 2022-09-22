const {Router} = require('express');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const {check} = require("express-validator");

const {esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");


// const {validarJwt} = require("../middlewares/validar-jwt");
// const {esAdminRole, tieneRole} = require("../middlewares/validar-roles");
// const {validarCampos} = require("../middlewares/validar-campos");

const {
    validarJwt,
    esAdminRole,
    tieneRole,
    validarCampos
} = require('../middlewares')

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passsword debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),

    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJwt,
    // esAdminRole,
    tieneRole('USER_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

], usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;