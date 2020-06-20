const pool = require('../../config/database');


module.exports = {

    AddtoCart: (data, callBack) => {

        pool.query(
            `select * from cart where store_id = ? AND item_id = ?`,
            [
                data.store_id,
                data.item_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                if (results.length !== 0) {
                    console.log("UPDATE"),
                        pool.query(
                            `update cart set qty = qty + ? where store_id = ? AND item_id = ?`,
                            [
                                data.qty,
                                data.store_id,
                                data.item_id
                            ],
                            (error, results, fields) => {
                                console.log(results, "UPRESDJS")
                                if (error) {
                                    callBack(error);
                                }
                                return callBack(null, results);
                            }
                        )
                }

                if (results.length == 0) {
                    pool.query(
                        `insert into cart (item_id, store_id, qty) values (?,?,?)`,
                        [
                            data.item_id,
                            data.store_id,
                            data.qty
                        ],
                        (error, results, fields) => {
                            if (error) {
                                callBack(error);
                            }
                            return callBack(null, results);
                        }
                    )
                }
            }
        )
    },

    getCart: (data, callBack) => {
        pool.query(
            `select cart.id, cart.item_id, cart.qty, store_item.item_description, store_item.item_name, store_item.item_price, store_item.item_image from 
             cart inner join store_item on cart.item_id = store_item.id where cart.store_id = ? `,
            [data.store_id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    deletecart: (data, callBack) => {
        pool.query(
            `delete from cart where id = ?`,
            [data.cart_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deletecartbystoreid: (data, callBack) => {
        console.log(data, "DJ DELE")
        pool.query(
            `delete from cart where store_id = ?`,
            [data.store_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }


}
