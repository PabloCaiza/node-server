const {response, json} = require("express");
const path = require("path");
const {v4: uuidv4} = require('uuid')
const {subirArchivo} = require("../helpers");
const {Usuario, Producto} = require("../models");
const cloudinary=require('cloudinary').v2
const fs = require("fs");

cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async (req, res = response || !req.files.archivo) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs')
        res.json({
            nombre
        })
    } catch (msg) {
        return res.status(400).json({msg})

    }


}

const actualizarImagen = async (req, res = response) => {

    const {id, coleccion} = req.params
    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un usario con el id ${id}`})
            break
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un producto con el id ${id}`})
            break
        default:
            return res
                .status(500)
                .json({msg: 'Se me olvido validar esto'})

    }
    //limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }

    }
    const nombre = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre
    await modelo.save()
    res.json(modelo)
}


const actualizarImagenClaudinary = async (req, res = response) => {

    const {id, coleccion} = req.params
    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un usario con el id ${id}`})
            break
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un producto con el id ${id}`})
            break
        default:
            return res
                .status(500)
                .json({msg: 'Se me olvido validar esto'})

    }
    //limpiar imagenes previas
    if (modelo.img) {
        //TODO:
        const nombre=modelo.img.split('/')[modelo.img.split('/').length-1]
        const [public_id]=nombre.split('.')
        await cloudinary.uploader.destroy(public_id)

    }
    const {tempFilePath}=req.files.archivo
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath)
    modelo.img=secure_url
    await modelo.save()
    res.json(modelo)
}
const mostrarImagen=async (req,res=response)=>{
    const {id, coleccion} = req.params
    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un usario con el id ${id}`})
            break
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) return res.status(400).json({msg: `No existe un un producto con el id ${id}`})
            break
        default:
            return res
                .status(500)
                .json({msg: 'Se me olvido validar esto'})

    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }

    }
    res.sendFile(path.join(__dirname,'../assets','no-image.jpg'))


}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenClaudinary
}