const { AddtoCart, getCart, deletecart, deletecartbystoreid } = require('./store_cart.service');


module.exports = {

    AddtoCart: (req, res) => {
        let body = req.body;
        AddtoCart(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item has been added to cart!",
            });
        })
    },

    getCart: (req, res) => {
        const body = req.body;
        getCart(body, (err, results) => {
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
            });
        });
    },


    deletecart: (req, res) => {
        const data = req.body;
        deletecart(data, (err, results) => {
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
                message: "Item removed from cart successfully"
            })
        })
    },

    deletecartbystoreid: (req, res) => {
        const data = req.body;
        deletecartbystoreid(data, (err, results) => {
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
                message: "Items removed from cart successfully"
            })
        })
    },



}