const { createStore, getUserbyPhone, getAllStores, getStoreById, updateStore, deleteStore } = require("./store_user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    createStore: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.store_password = hashSync(body.store_password, salt);
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
                message: "Store has been Created Successfully",
                data: {}
            });
        })
    },


    login: (req, res) => {
        const body = req.body;
        getUserbyPhone(body.store_username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.store_password, results.store_password);
            if (result) {
                results.store_password = undefined;
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
    },

    store_list: (req, res) => {
        getAllStores((err, results) => {

            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }

            if (results) {
                var resdata = [];
                for (i = 0; i < results.length; i++) {
                    delete results[i].store_password;
                    resdata.push(results[i])
                }

                return res.status(200).json({
                    success: 1,
                    data: resdata,
                })
            }


        })
    },

    getStoreById: (req, res) => {
        const body = req.body;
        getStoreById(body, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    updateStore: (req, res) => {
        console.log(req, "DJ REQ")
        const body = req.body;
        const salt = genSaltSync(10);
        if (body.store_password == "" || null || undefined) {
            body.store_password = ""
        }
        else {
            body.store_password = hashSync(body.store_password, salt);
        }
        updateStore(body, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Something went wrong!"
                });
            }

            return res.status(200).json({
                success: 1,
                data: "Store data has been updated successfully!"
            })
        })
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
                message: "Store deleted successfully!"
            })
        })
    },

}