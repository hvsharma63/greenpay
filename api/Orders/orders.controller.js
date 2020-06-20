const { createOrder, getOrders, getOrdersByStoreId, getSales, getOrderbyStoreCount, addTocart, getCart, deletecart, deletecartbystoreid } = require("./orders.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    createOrder: (req, res) => {
        const body = req.body;
        createOrder(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Order has been placed Successfully",
                data: {}
            });
        })
    },

    getOrders: (req, res) => {
        getOrders((err, results) => {
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

    getOrdersByStoreId: (req, res) => {
        const body = req.body;
        getOrdersByStoreId(body, (err, results) => {
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

    getSales: (req, res) => {
        getSales((err, results) => {
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
                data: {
                    all_stores_count: results[2].length,
                    all_stores_item_count: results[3].length,
                    all_orders_count: results[0].length,
                    all_customers_count: results[1].length,
                    all_sales_avg: results[4][0].average
                }
            })
        })
    },

    getOrderbyStoreCount: (req, res) => {
        const body = req.body;
        getOrderbyStoreCount(body, (err, results) => {
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
                data: {
                    "orderscount": results[0].length,
                    "menu_items_count": results[1].length,
                }
            })
        })
    },


    addTocart: (req, res) => {
        const body = req.body;
        addTocart(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item added to cart.",
                data: {}
            });
        })
    },

    getCart: (req, res) => {
        const body = req.body;
        // console.log(body);
        // return;
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
                message: "Item removed from cart successfully"
            })
        })
    },
}
