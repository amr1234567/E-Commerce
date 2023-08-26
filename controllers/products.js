const { response } = require('express');
const Products = require('../modules/products')


const getAllProducts = async(req,res)=>{
    const {rating,name,size,brand,category,price,numericFilters,sort,fields}=req.query
    const queryObject ={};
    if(brand) {
        
        queryObject.brand=brand
        

    }
    if(name){
        queryObject.name={ $regex: name, $options: 'i' };
    }
    if(category){
        queryObject.category=category
        
    }
    if(numericFilters){
        const OpMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        
        const RegEx = /\b(<|>|=|<=|>=)\b/g
        let filters =numericFilters.replace(RegEx,(match)=>`-${OpMap[match]}-`)
        const options =['price','rating','size']
        filters = filters.split(',').forEach((item)=>{
            console.log(filters)
            const [field,operator,value] =item.split('-')
            if(options.includes(field)) {
                queryObject[field]={[operator]:Number(value)}
            } 
        })
    }
    


    console.log(queryObject)
    let result = Products.find(queryObject)
    
    //if(brand){
      //  const BrandList = sort.split
    //}

    if(sort){
        const sortList =sort.split(',').join(" ")
        console.log(sortList)
        result = result.sort(sortList)
    }else{
        result = result.sort('price')
    }
    if(fields){
        const FieldList =fields.split(',').join(" ")
        result = result.select(FieldList)
    }
    const page =Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 9
    const skip=(page-1)*limit

    result= result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products,nbHits:products.length})
}
const getProduct = 
async(req,res)=>{
    const {id:PrdoctID} = req.params
    const product = await Products.findOne({_id:PrdoctID})
    if(!product){
        res.status(404).send(`No product with id:${ProductID}`)
    }
    res.status(200).json({product})
}
const postProduct = async(req,res)=>{
    let product = new Products({
        name:req.body.name,
        brand:req.body.brand,
        category:req.body.category,
        rating:req.body.rating,
        price:req.body.price,
        size:req.body.size
    })
    if(req.file){
        product.image= req.file.path
    }
    product.save()
    .then(response=>{
        res.json({product})
    }).catch(error=>{
        res.json({msg:"an error happened"},console.log(error))
    })
}
const editProduct = async(req,res)=>{
    const {id:PrdouctID} = req.params
    console.log(PrdouctID)
    console.log(req.body)
    const product = await Products.findOneAndUpdate({_id:PrdouctID},req.body,{
        new:true,
        runValidators:true
    })
    if(!product){
        res.status(404).send(`No product with id:${ProductID}`)
    }
    res.status(200).json({product})
}
const deleteProduct = async(req,res)=>{
    const {id:PrdoctID} = req.params
    const product = await Products.deleteOne({_id:PrdoctID})
    res.status(201).json({product})
}
module.exports={
    getAllProducts,getProduct,editProduct,deleteProduct,postProduct
}