const pool = require("../../config/database");




module.exports = {
    createCustomer: (data, callBack) => {

        var ID =
            "dj-" +
            Math.random()
                .toString(36)
                .substr(2, 9) +
            ".cus";

        pool.query(
            `insert into customer(cus_id,username, user_image, user_id, roll_no, wallet_bal)
            values(?,?,?,?,?,?)`,
            [
                ID,
                data.username,
		data.user_image,
                data.user_id,
                data.roll_no,
                data.wallet_bal
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCustomers: callBack => {
        pool.query(
            `select * from customer`,
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

    getCustomerById: (id, callBack) => {
        pool.query(
            `select * from customer where cus_id = ? or roll_no = ? or user_id = ?`,
            [id,id,id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateCustomer: (data, callBack) => {
        pool.query(
            `update customer set username=?, wallet_bal=?, user_id=?, roll_no=? 
             where cus_id=?`,
            [data.username, data.email, data.phone, data.password, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteCustomer: (data, callBack) => {
        pool.query(
            `delete  from customer where cus_id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


};
