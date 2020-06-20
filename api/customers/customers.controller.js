const { createCustomer, getCustomerById, getCustomers, updateCustomer, deleteCustomer } = require("./customers.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createCustomer: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        createCustomer(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User Registered Successfully",
                data: {}
            });
        })
    },

    getCustomerById: (req, res) => {
        const id = req.params.id;
        getCustomerById(id, (err, results) => {
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

    getCustomers: (req, res) => {
        getCustomers((err, results) => {
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

    updateCustomer: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateCustomer(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "User update Successfully"
            });
        });
    },

    deleteCustomer: (req, res) => {
        const data = req.body;
        deleteCustomer(data, (err, results) => {
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
                message: "User deleted successfully"
            })
        })
    },

}