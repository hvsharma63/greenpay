const pool = require("../../config/database");
const fs = require('fs');

module.exports = {

    createStoreMenu: (data, callBack) => {

        var ID =
            "dj-" +
            Math.random()
                .toString(36)
                .substr(2, 9) +
            "itm";

        pool.query(
            `insert into stores_menu(store_id, item_id, item_name, item_image, item_price, item_desc )
                values(?,?,?,?,?,?)`,
            [
                data.store_id,
                ID,
                data.item_name,
                data.item_image,
                data.item_price,
                data.item_desc,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMenu: callBack => {
        pool.query(
            `select * from stores_menu  where store_id != 'Admin'`,
            [],
            (error, results, fields) => {
                if (error) {
                    // console.log(error, "DISHANK")
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMenuByStoreId: (id, callBack) => {
        pool.query(
            `select * from stores_menu where store_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getItem: (data, callBack) => {
        pool.query(
            `select * from stores_menu where item_id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateMenuStore: (data, callBack) => {
        pool.query(
            `update stores_menu set item_name =?, item_image=?, item_price=?, item_desc=?
                 where item_id=?`,
            [data.item_name, data.item_image, data.item_price, data.item_desc, data.item_id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteMenuStore: (data, callBack) => {
        pool.query(
            `delete  from stores_menu where item_id = ?`,
            [data.item_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
