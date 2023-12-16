const { mkdirp } = require("mkdirp");
const multer = require("multer");
const path = require("path");
// Post image 
 const uploadImage = (forder) => {
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const base = mkdirp.sync(`./public/upload/${forder}`)
        cb(null,`./public/upload/${forder}`);
    },
    filename: (req,file,cb) => {
        // cb(null, Date.now() + "_" +file.originalname)
        // Format file name 
        const uniqueDate = Date.now();
        const lastNameFile = path.extname(file.originalname);
        cb(null,file.fieldname + '_' + uniqueDate + lastNameFile);
    }
}   )
const upload = multer({
    storage: storage,
    // validate Image 
    fileFilter: function (req,file,cb) {
        const extensionImage = ['.png','jpeg'];
        const extension = file.originalname.slice(-4);
        const check = extensionImage.includes(extension);
        if(check){
            cb(null,true)
        }else {
            cb(new Error('Đôi ảnh không hợp lệ'));
        }
    }
})
return upload.single('product');
}
module.exports = {uploadImage}