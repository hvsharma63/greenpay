const { createOrder, get_all_orders, get_all_ordersbyid, get_dashboard, get_dashboardby_id } = require('./store_order.service');



module.exports = {

    createOrder: (req, res) => {
        var body = req.body;
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
                // data: {}
            });

        })
    },

    getOrder: (req, res) => {
        get_all_orders((err, results) => {
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
        });
    },

    getOrderbyid: (req, res) => {
        var body = req.body;
        get_all_ordersbyid(body, (err, results) => {
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
        });
    },


    getDashboard: (req, res) => {
        get_dashboard((err, results) => {
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
                data: {
                    store_orders: results[0][0].store_orders,
                    store_customers: results[1][0].store_customers,
                    store_items: results[2][0].store_items,
                    stores: results[3][0].stores,
                    store_sales:results[4][0].store_sales
                }
            });
        });
    },

    getDashboardby_id: (req, res) => {
        var body = req.body;
        get_dashboardby_id(body, (err, results) => {
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
                data: {
                    store_items: results[1][0].store_items,
                    store_orders: results[0][0].store_order,
                    store_avg: results[2][0].store_avg
                }
            });
        });
    },


}
