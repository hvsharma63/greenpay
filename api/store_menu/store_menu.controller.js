const { createItem, get_all_storeitem, get_storeitem_byid, delete_menu_item, update_storeItem } = require('./store_menu.service');



module.exports = {

    createItem: (req, res) => {
        var body = req.body;
        createItem(body, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Item has been added Successfully",
                // data: {}
            });

        })
    },

    get_all_storeitem: (req, res) => {
        get_all_storeitem((err, results) => {

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

    get_storeitem_byid: (req, res) => {
        var body = req.body;
        get_storeitem_byid(body, (err, results) => {

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

    update_storeitem: (req, res) => {
        var body = req.body;
        update_storeItem(body, (err, results) => {

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
                message: "Item has been updated Successfully!",
            });
        })
    },

    deleteMenuitem: (req, res) => {
        var body = req.body;
        delete_menu_item(body, (err, results) => {

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
                message: "Record deleted Successfully!",
            });
        })
    }


}
