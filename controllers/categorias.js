const {response, request} = require('express')
const {Categoria} = require("../models");


//obtenerCategorias-paginado-total -papulate (show user detail with obly the id stored in category object)
const obtenerCategorias = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query
    const [categorias, total] = await Promise.all([Categoria
        .find({estado: true})
        .populate("usuario")
        .skip(+desde)
        .limit(+limite),
        Categoria.countDocuments({estado: true})])

    res.json({
        categorias,
        total
    })


}
//obtenerCateogria -populate {}
const obtenerCategoria = async (req = request, res = response) => {

    const {id}=req.params
    const categoria=await Categoria.findById(id).populate('usuario')
    res.json(categoria)


}
const crearCategorias = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()
    const categoriaDb = await Categoria.findOne({nombre});
    if (categoriaDb) return res.status(400).json({msg: `la categoria ${categoriaDb.nombre} ya existe`})
    const data = {
        nombre,
        usuario: req.usuario._id

    }

    const categoria = new Categoria(data)
    await categoria.save()
    res.status(201).json(categoria)


}

//actualizarCategoria validaciones nombre no deberia existir
const actualizarCategoria=async (req,res=response)=>{

    const nombre=req.body.nombre.toUpperCase()
    const {id}=req.params
    const categoriaDb = await Categoria.findOne({nombre});
    if (categoriaDb) return res.status(400).json({msg: `la categoria ${categoriaDb.nombre} ya existe`})
    const categoria=await Categoria.findByIdAndUpdate(id,{nombre,usuario:req.usuario._id},{new:true})
    res.json(categoria)
}
//borarCategoria- estado:false
const borarCategoria=async (req=request,res=response)=>{

    const {id}=req.params
    const usuario=await Categoria.findByIdAndUpdate(id,{estado:false})
    const usuarioAutenticado=req.usuario
    res.json({usuario,usuarioAutenticado})

}

module.exports = {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borarCategoria
}