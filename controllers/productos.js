const {response, request} = require('express')
const {Producto} = require("../models");


//obtenerProductos-paginado-total -papulate (show user detail with obly the id stored in category object)
const obtenerProductos = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query
    const [productos, total] = await Promise.all([Producto
        .find({estado: true})
        .populate("usuario")
        .populate("categoria")
        .skip(+desde)
        .limit(+limite),
        Producto.countDocuments({estado: true})])

    res.json({
        productos,
        total
    })


}
//obtenerCateogria -populate {}
const obtenerProducto = async (req = request, res = response) => {
    const {id}=req.params
    const producto=await Producto.findById(id).populate('usuario').populate('categoria')
    res.json(producto)
}
const crearProducto = async (req, res = response) => {

    const {estado,usuario,...producto} = req.body
    producto.nombre=producto.nombre.toUpperCase()
    const ProductoDb = await Producto.findOne({nombre:producto.nombre});
    if (ProductoDb) return res.status(400).json({msg: `el Producto ${ProductoDb.nombre} ya existe`})
    producto.usuario=req.usuario._id
    const productoSaved = new Producto(producto)
    await productoSaved.save()
    res.status(201).json(productoSaved)


}

//actualizarProducto validaciones nombre no deberia existir
const actualizarProducto=async (req,res=response)=>{

    const {estado,usuario,...producto} = req.body
    producto.nombre=producto.nombre.toUpperCase()
    const {id}=req.params
    const productoDb = await Producto.findOne({nombre:producto.nombre});
    if (productoDb) return res.status(400).json({msg: `la Producto ${productoDb.nombre} ya existe`})
    producto.usuario=req.usuario._id
    const product=await Producto.findByIdAndUpdate(id,producto,{new:true})
    res.json(product)
}
//borarProducto- estado:false
const borarProducto=async (req=request,res=response)=>{

    const {id}=req.params
    const producto=await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    const usuarioAutenticado=req.usuario
    res.json({producto,usuarioAutenticado})

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borarProducto
}