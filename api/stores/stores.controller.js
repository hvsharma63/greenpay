const { createStore, updateStore, getStores, getUserbyPhone, getStoreById, deleteStore, ImageUpload } = require("./stores.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {


    //  ImageUpload: (req, res) => {
    //  ImageUpload((results) => {
    //      console.log(results)
    //      if (!results) {
    //          return res.json({
    //              success: 0,
    //              message: "Records not found ..."
    //          });
    //      }
    //      return res.json({
    //          success: 1,
    //          data: results
    //      })
    //  })
    //  },

    createStore: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createStore(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Store Created Successfully",
                data: {}
            });
        })
    },

    getStoreById: (req, res) => {
        const id = req.params.id;
        getStoreById(id, (err, results) => {
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

    getStores: (req, res) => {
        getStores((err, results) => {
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

    updateStores: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateStore(body, (err, results) => {
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
                message: "Store update Successfully"
            });
        });
    },

    deleteStore: (req, res) => {
        const data = req.body;
        deleteStore(data, (err, results) => {
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
                message: "Store deleted successfully"
            })
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUserbyPhone(body.phone, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234");
                return res.json({
                    success: 1,
                    message: "Login Successfully",
                    data: results,
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
        });
    }

}
