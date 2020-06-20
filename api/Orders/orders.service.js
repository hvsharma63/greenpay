const pool = require("../../config/database");
const fs = require('fs');



module.exports = {

    createOrder: (data, callBack) => {

        var ID =
            "dj-" +
            Math.random()
                .toString(36)
                .substr(2, 9) +
            ".odr";

         pool.query(
             `update customer set wallet_bal = wallet_bal - ?
                              where cus_id=? or user_id = ? or roll_no = ? `,
             [data.wallet_bal, data.cus_id, data.cus_id, data.cus_id, data.cus_id
             ],
             (error, results, fields) => {
                 if (error) {
                     console.log(error);
                     return callBack(error);
                 }

                 //return callBack(null, results);
                 else {
			pool.query(
			    `insert into orders(order_id, item_id, store_id, order_date, cus_id)
				    values ?`,
			    [
				data.data
			    ],
			    (error, results) => {
				console.log(results, "NEWDAATA")
				if (error) {
				    callBack(error);
				}
				return callBack(null, results);
			    }
			);
             }
         });
    },


    getOrders: callBack => {
        pool.query(
            `select orders.order_id, orders.order_date, customer.username,
                stores_menu.item_name, stores_menu.item_price, stores.store_name, stores_menu.item_image, stores.store_image
            from (((orders
            inner join customer on orders.cus_id = customer.cus_id or customer.user_id or customer.roll_no)
            inner join stores_menu on orders.item_id = stores_menu.item_id)
            inner join stores on orders.store_id = stores.store_id)`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getOrdersByStoreId: (data, callBack) => {
        pool.query(
            `select orders.order_id, orders.order_date, customer.username, 
                stores_menu.item_name, stores_menu.item_price, stores.store_name, stores_menu.item_image, stores.store_image
            from (((orders
            inner join customer on orders.cus_id = customer.cus_id or customer.user_id or customer.roll_no )
            inner join stores_menu on orders.item_id = stores_menu.item_id)
            inner join stores on orders.store_id = stores.store_id) where orders.store_id = ?`,
            [data.store_id],
            (error, results, fields) => {
                if (error) {
                    // console.log(error, "DISHANK")
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSales: callBack => {


        var sql = "select * from orders; select * from customer; select * from stores; select * from stores_menu; select AVG(stores_menu.item_price) as average from  orders inner join stores_menu on orders.item_id = stores_menu.item_id"
        pool.query(

            sql, [5, 4, 3, 2, 1], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    // select * from stores where store_id = ${data.store_id}; select * from stores_menu where store_id = ${data.store_id}; select AVG(stores_menu.item_price) from  orders inner join stores_menu on orders.item_id = stores_menu.item_id where store_id = ${data.store_id}`

    getOrderbyStoreCount: (data, callBack) => {
        pool.query(
            `select * from orders where store_id = ?; select * from stores_menu where store_id = ? `
            , [data.store_id, data.store_id],
            (error, results, fields) => {
                if (error) {
                    // console.log(error, "DISHANK")
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCart: (data, callBack) => {
        pool.query(
            `select cart.status,cart.cart_id, cart.item_id, cart.qty, stores_menu.item_name, stores_menu.item_price, stores_menu.item_image from 
             cart inner join stores_menu on cart.item_id = stores_menu.item_id where cart.store_id = ? `,
            [data.store_id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    addTocart: (data, callBack) => {
        var ID =
            "dj-" +
            Math.random()
                .toString(36)
                .substr(2, 9) +
            ".crt";

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
                // return callBack(null, results)
                // console.log(results.length,"DISHANK")
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
                        `insert into cart (cart_id, item_id, store_id, status, qty) values (?,?,?,?,?)`,
                        [
                            ID,
                            data.item_id,
                            data.store_id,
                            data.status,
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

    deletecart: (data, callBack) => {
        pool.query(
            `delete from cart where cart_id = ?`,
            [data.cart_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // updateCart: (data, callBack) => {
    //     pool.query
    // },


    deletecartbystoreid: (data, callBack) => {

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

