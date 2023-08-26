const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination:'./public/assets',
    filename:(req,file,cb)=>{
        console.log(file.originalname)
        return cb(null,file.originalname)
    }
})
const upload = multer({ 
    storage: storage,
    
    limits:{
        fileSize:1024*1024*10
    }
})

module.exports = upload