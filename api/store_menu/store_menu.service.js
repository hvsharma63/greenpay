const pool = require('../../config/database');

module.exports = {

    createItem: (data, callBack) => {
        pool.query(
            `insert into store_item(store_id, item_name, item_description, item_image, item_price)
            values (?,?,?,?,?)`,
            [
                data.store_id,
                data.item_name,
                data.item_description,
                data.item_image,
                data.item_price
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    get_all_storeitem: (callBack) => {
        pool.query(
            `select * from store_item`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        )
    },

    get_storeitem_byid: (data, callBack) => {
        pool.query(
            `select * from store_item where store_id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    update_storeItem: (data, callBack) => {
        pool.query(
            `update store_item set item_name =? , item_description = ?, item_price = ?, item_image =? where id=?`,
            [data.item_name, data.item_description, data.item_price, data.item_image, data.item_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                console.log(results, "DJNU")
                return callBack(null, results);
            }
        )
    },

    delete_menu_item: (data, callBack) => {
        pool.query(
            `delete  from store_item where id = ?`,
            [data.item_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }


}
