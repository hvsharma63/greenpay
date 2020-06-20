require("dotenv").config();
const express = require('express')
const app = express();
// const fs = require('fs');

var multer = require('multer')
// var upload = multer({ dest: 'public/images' })

const storeRouter = require("./api/store_user/store_user.router");
const customerRouter = require("./api/store_customer/store_customer.router");
const orderRouter = require("./api/store_order/store_order.router");
const storeitemRouter = require("./api/store_menu/store_menu.router");
const cartRouter = require("./api/store_cart/store_cart.router");



app.use(express.json());

//  Code for File Upload. "Dishank"
app.post('/api/upload', (req, res, next) => {
    var path = require('path');

    const imageFilter = function (req, file, cb) {

        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/images/');
        },
        filename(req, file = {}, cb) {
            const { originalname } = file;
            const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
            cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
        },
    });


    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('fileData');

    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        return res.status(200).json({
            success: 1,
            message: "Image added Successfully",
            data: req.file.filename
        });

    });
})
// End of the Function File Upload "Dishank"

app.use(express.static('public'));

app.use("/green_pay/api/stores/", storeRouter);
app.use("/green_pay/api/customers/", customerRouter);
app.use("/green_pay/api/orders/", orderRouter);
app.use("/green_pay/api/item/", storeitemRouter);
app.use("/green_pay/api/cart/", cartRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Dishank Server running......", process.env.APP_PORT)
})
