import path  from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file , cb){
        cb(null ,'uploads')
    },
    filename(req, file, cb){
        //to avoid images with same name
        // Modify => file-date-extension
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})


// TO allow specific types of file to uplaod
function checkFileType(file, cb){
    const filetypes  = /jpg|jpeg|png/;
    // Gives true if match otherwise false
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if(extname && mimetype){
        return cb (null, true);
    }else{
        return cb("Image Only!")
    }
}

//To avoid any type of file to be uplaoded => filefilter
const upload  = multer({
    storage,
    fileFilter : function(req ,file, cb){
        checkFileType(file, cb);
    }
})


//Create endpoint
// Get path as response set it to image in the frontend
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})


export default router ;