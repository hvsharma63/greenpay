const pool = require('../../config/database');
var moment = require('moment');

module.exports = {

    createCustomer: (data, callBack) => {

        pool.query(
            `insert into customer(
                customer_name, customer_barcode, customer_type, 
                customer_topup, customer_phone, 
                company_name, customer_remarks, 
                customer_breakfast, customer_lunch, 
                customer_dinner, customer_start_date, customer_image 
                ) values(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.customer_name,
                data.customer_barcode,
                data.customer_type,
                data.customer_topup,
                data.customer_phone,
                data.company_name,
                data.customer_remarks,
                data.customer_breakfast,
                data.customer_lunch,
                data.customer_dinner,
                data.customer_start_date,
                data.customer_image
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }

        );
    },

    get_all_customer: (callBack) => {
        pool.query(
            `select * from customer`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        )
    },

    get_customer_byid: (data, callBack) => {

        pool.query(
            `select * from customer where id = ? or customer_barcode = ?`,
            [data.id, data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                else {
                    pool.query(
                        `select * from store_orders where customer_id = ? AND order_date = ?`,
                        [data.id, moment(new Date()).format("YYYY-MM-DD")],
                        (error, results, fields) => {
                            if (error) {
                                console.log(error);
                            }
                            else if (results.length > 0) {
                                console.log(results, "RESULT")
                                console.log(moment(new Date()).format("YYYY-MM-DD"), "Date")
                                for (let i = 0; i < results.length; i++) {

                                    if (results[i].order_breakfast === "1") {
                                        result[0].cust_today_breakfast = "1"
                                    }

                                    if (results[i].order_lunch === "1") {
                                        result[0].cust_today_lunch = "1"
                                    }

                                    if (results[i].order_dinner === "1") {
                                        result[0].cust_today_dinner = "1"
                                    }
                                }
                            }
                            else {
                                result[0].cust_today_breakfast = "0";
                                result[0].cust_today_lunch = "0";
                                result[0].cust_today_dinner = "0";
                            }

                            if (!result[0].hasOwnProperty("cust_today_breakfast")) {
                                result[0].cust_today_breakfast = "0";
                            }

                            if (!result[0].hasOwnProperty("cust_today_lunch")) {
                                result[0].cust_today_lunch = "0";
                            }

                            if (!result[0].hasOwnProperty("cust_today_dinner")) {
                                result[0].cust_today_dinner = "0";
                            }

                            console.log(result[0], "DJ DJ DJ")
                            return callBack(null, result[0]);
                        }
                    )
                }
            }
        );
    },

    updateCustomer: (data, callBack) => {

        pool.query(
            `update customer set
                    customer_name = ? , customer_type = ?, 
                    customer_topup = ?, customer_phone = ?, 
                    company_name = ?, customer_remarks = ?, 
                    customer_breakfast = ?, customer_lunch = ?, 
                    customer_dinner = ?, customer_start_date = ?,
                    customer_image=?
                    where id = ?`,
            [
                data.customer_name,
                data.customer_type,
                data.customer_topup,
                data.customer_phone,
                data.company_name,
                data.customer_remarks,
                data.customer_breakfast,
                data.customer_lunch,
                data.customer_dinner,
                data.customer_start_date,
                data.customer_image,
                data.customer_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }

        );
    },

    delete_customer_byid: (data, callBack) => {
        const message = "User not found, please try again!"
        pool.query(
            `select * from customer where id = ?`,
            [data.customer_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                console.log(results.length, "DD")

                if (results.length !== 0) {
                    console.log("IN DELETE");
                    pool.query(
                        `delete from customer where id = ?`,
                        [data.customer_id],
                        (error, results, fields) => {
                            if (error) {
                                return callBack(error);
                            }

                            return callBack(null, "Customer has been deleted successfully!");
                        });
                }

                if (results.length === 0) {
                    return callBack(null, message);
                }

            });
    }


}
