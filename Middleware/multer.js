const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/public/temp"));
  },
  filename: function (req, file, cb) {
    console.log('file', file);
    const fileExt = path.extname(file.originalname);
    const customFileName = file.originalname.replace(fileExt, "").split(" ").join("-") + "-" + Date.now();

    cb(null, customFileName + fileExt);
  },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg .jpeg .png is allowed!"));
        }
    }
});

module.exports = upload;
