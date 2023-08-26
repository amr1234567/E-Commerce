const mongoose = require('mongoose')
const ConnectDB = async(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = ConnectDB