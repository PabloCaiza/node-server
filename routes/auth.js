const {Router}=require('express')
const {check}=require('express-validator')
const {login} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");

const router=Router()

router.post("/login",[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La password ens obligaotrio').notEmpty(),
    validarCampos
],login)



module.exports=router