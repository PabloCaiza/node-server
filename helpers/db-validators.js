const Role = require("../models/role");
const Usuario = require("../models/usuario");
const {Categoria, Producto} = require("../models");
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

const existeCategoria=async id=>{
    const categoria=await Categoria.findById(id)
    if(!categoria)throw new Error(`La categoria con id ${id} no existe`)
}
const existeProducto=async id=>{
    const producto=await Producto.findById(id)
    if(!producto)throw new Error(`El producto con id ${id} no existe`)
}
module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}