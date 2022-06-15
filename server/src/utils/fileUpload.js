const multer = require('multer');

//Fileupload
//AP3
const SignatureAP3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Signature/AP3");
    },
    filename: (req, file, cb) => {
        cb(null, "file-" + "-" + file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
});
const uploadAP3 = multer({ storage: SignatureAP3 });
//PO
const SignaturePO = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Signature/PO");
    },
    filename: (req, file, cb) => {
        cb(null, "file-" + "-" + file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
});
const uploadPO = multer({ storage: SignaturePO });
//PV
const SignaturePV = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Signature/PV");
    },
    filename: (req, file, cb) => {
        cb(null, "file-" + "-" + file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
});
const uploadPV = multer({ storage: SignaturePV });
//RV
const SignatureRV = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Signature/RV");
    },
    filename: (req, file, cb) => {
        cb(null, "file-" + "-" + file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
    },
});
const uploadRV = multer({ storage: SignatureRV });

module.exports = { uploadAP3, uploadPO, uploadPV, uploadRV };