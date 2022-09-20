const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRoleValido=async rol =>{
    const existeRol=await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}
const emailExiste=async  correo=>{
    const existeEmail=await Usuario.findOne({correo})
    if(existeEmail) {
        throw new Error(`el email ${correo} ya esta registrado`)
    }


}

const existeUsuarioPorId=async  id=>{
    const user=await Usuario.findById(id)
    if(!user) {
        throw new Error(`el usuario  con el id: ${id} no existe`)
    }


}
module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}