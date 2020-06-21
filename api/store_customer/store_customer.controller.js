const { createCustomer, get_all_customer, get_customer_byid, delete_customer_byid, updateCustomer } = require('./store_customer.service');

module.exports = {

    createCustomer: (req, res) => {
        console.log(req.body);
        var body = req.body;
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
                message: "Customer has been Created Successfully",
                data: {}
            });
        })
    },

    get_all_customer: (req, res) => {
        get_all_customer((err, results) => {

            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found!"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Records Found!",
                data: results
            });
        })
    },

    get_customer_byid: (req, res) => {
        var body = req.body;
        get_customer_byid(body, (err, results) => {

            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found!"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Records Found!",
                data: results
            });
        })
    },

    updateCustomer: (req, res) => {
        const body = req.body;
        updateCustomer(body, (err, results) => {
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
                data: "customer has been updated successfully!"
            })
        })
    },

    delete_customer_byid: (req, res) => {
        var body = req.body;
        delete_customer_byid(body, (err, results) => {
            if (err) {
                console.log(err);
            }

            return res.status(200).json({
                success: 1,
                message: results//'Customer has been deleted successfully!'
            });
        })
    }




}

