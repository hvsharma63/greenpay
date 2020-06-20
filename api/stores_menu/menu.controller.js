const { createStoreMenu, updateMenuStore, getMenu, getMenuByStoreId, deleteMenuStore, getItem } = require("./menu.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {


    // ImageUpload: (req, res) => {
    // ImageUploads((results) => {
    //     console.log(results)
    //     if (!results) {
    //         return res.json({
    //             success: 0,
    //             message: "Records not found"
    //         });
    //     }
    //     return res.json({
    //         success: 1,
    //         data: results
    //     })
    // })
    // ImageUploads().then((results) => {
    //     return res.json({
    //         success: 1,
    //         data: results
    //     })
    // }).catch(error => {

    // })
    // },

    createStoreMenu: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        createStoreMenu(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Menu added Successfully!!",
                data: {}
            });
        })
    },

    getMenuByStoreId: (req, res) => {
        const id = req.params.id;
        getMenuByStoreId(id, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getMenu: (req, res) => {
        getMenu((err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

	getItem: (req, res) => {
        const body = req.body;
        getItem(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    updateMenuStore: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateMenuStore(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update store data!"
                })
            }
            return res.json({
                success: 1,
                message: "Store menu update Successfully"
            });
        });
    },

    deleteMenuStore: (req, res) => {
        const data = req.body;
        deleteMenuStore(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.json({
                success: 1,
                message: "Store Item deleted successfully"
            })
        })
    },


}
