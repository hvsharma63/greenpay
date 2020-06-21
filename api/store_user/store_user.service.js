const pool = require("../../config/database");


module.exports = {

    createStore: (data, callBack) => {

        pool.query(
            `insert into store_user( store_username, store_password, store_name, store_description, store_image )
                values(?,?,?,?,?)`,
            [
                data.store_username,
                data.store_password,
                data.store_name,
                data.store_description,
                data.store_image
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getUserbyPhone: (phone, callBack) => {
        pool.query(
            `select * from store_user where store_username = ?`,
            [phone],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getAllStores: (callBack) => {
        pool.query(
            `select * from store_user where store_name != 'Admin'`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getStoreById: (data, callBack) => {
        pool.query(
            `select * from store_user where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateStore: (data, callBack) => {
        console.log(data, "DD");
        if (data.store_password == "" || null || undefined) {
            console.log("NO PP DJ")
            pool.query(
                `update store_user set  store_username=?, store_name=?, store_description=?, store_image=?
                     where id=?`,
                [data.store_username, data.store_name, data.store_description, data.store_image, data.store_id],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        }
        else {
            console.log("PP DJ")
            pool.query(
                `update store_user set  store_username=?, store_password=?, store_name=?, store_description=?, store_image=?
                 where id=?`,
                [data.store_username, data.store_password, data.store_name, data.store_description, data.store_image, data.store_id],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        }
    },

    deleteStore: (data, callBack) => {
        console.log(data, "DJ DATA")
        pool.query(
            `delete  from store_user where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results, "DJ DEL")
                return callBack(null, results);
            }
        );
    },

}