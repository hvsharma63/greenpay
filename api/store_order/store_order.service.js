const pool = require('../../config/database');

module.exports = {

    // data.customer_id,
    // data.store_id,
    // data.item_id,
    // data.order_total,
    // data.order_type,
    // data.order_date,
    // data.order_breakfast,
    // data.order_lunch,
    // data.order_dinner,
    // data.mode_of_payment

    createOrder: (data, callBack) => {
        console.log(data, "DJ DAA QURY")
        pool.query(
            `insert into store_orders(customer_id, store_id, order_total, order_type, order_date, order_breakfast, order_lunch, order_dinner, mode_of_payment, item_id)
            values ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },


    get_all_orders: (callBack) => {
        pool.query(`select store_orders.order_total, store_orders.order_type, store_orders.order_date, store_user.store_name, store_user.store_description, store_item.item_name, customer.customer_name 
            from (((store_orders
            inner join customer on store_orders.customer_id = customer.id || store_orders.customer_id = customer.customer_barcode)
            inner join store_user on store_orders.store_id = store_user.id )
            inner join store_item on store_orders.item_id = store_item.id )`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },


    // inner join store_item on store_orders.item_id = store_item.id )
    get_all_ordersbyid: (data, callBack) => {
        pool.query(`select store_orders.order_total, store_orders.item_id, store_orders.order_type, store_orders.order_date, store_user.store_name, store_item.item_name, store_user.store_description, customer.customer_name 
            from (((store_orders
            inner join store_item on store_orders.item_id = store_item.id )
            inner join store_user on store_orders.store_id = store_user.id)
            inner join customer on store_orders.customer_id = customer.id|| store_orders.customer_id = customer.customer_barcode) where store_orders.store_id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                console.log(results, "DJ RES DJ")
                return callBack(null, results);
            }
        );
    },


    get_dashboard: (callBack) => {

        pool.query(`select count(*) as store_orders from store_orders; select count(*) as store_customers from customer; select count(*) as store_items from store_item; select count(*) as stores from store_user where store_name != "Admin" and id != "1"; select avg(order_total) as store_sales from store_orders;`, [5, 4, 3, 2, 1], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }

            console.log(results, "DJ RES DJ")
            return callBack(null, results);
        }
        );

    },

    get_dashboardby_id: (data, callBack) => {
        console.log(data, "DI DATA")
        var sql = `select count(*) as store_order from store_orders where store_id = ?; select count(*) as store_items from store_item  where store_id = ?; select avg(order_total) as store_avg from store_orders where store_id = ?`
        pool.query(sql,
            [data.store_id, data.store_id, data.store_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(JSON.parse(JSON.stringify(results)), "DATA BY ID")
                return callBack(null, JSON.parse(JSON.stringify(results)));
            }
        );

    }


}
