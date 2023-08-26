const mongoose = require('mongoose')

const products = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide the name of product"]
    },
    price:{
        type:Number,
        required:[true,"please provide the price of product"]
    },
    category:{
        type:[String],
        enum:{
            values:['Men','Children','Women'],
            message: '{VALUE} is not supported',
        }
    },
    size:{
        type:[Number],
        defult:40
    },
    
    brand:{
        type:String,
        defult:'others',
        enum:{
            values:['Adidas','H&M','Zara','Gucci','Nike','Tommy','Puma','others'],
            message: '{VALUE} is not supported',
        }
    },
    rating:{
        type:Number,
        defult:4.5
    },
    image:{
        type:String
    }
    
})
module.exports = mongoose.model('Products', products)
