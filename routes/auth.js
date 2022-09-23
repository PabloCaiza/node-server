const {Router}=require('express')
const {check}=require('express-validator')
const {login, googleSignIn} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");

const router=Router()

router.post("/login",[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La password ens obligaotrio').notEmpty(),
    validarCampos
],login)

router.post("/google",[
    check('id_token','Token de google es necesario').notEmpty(),
    validarCampos
],googleSignIn)



module.exports=router