const pool = require("../../config/database");
const fs = require('fs');
const path = require('path');


// const ImageUploads = async () => {
//     return new Promise((resolve, reject) => {

//         try {
//             let base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAABPElEQVR4nO3azUrDQBRA4RMXpgV9cxERFxahC30DF8WX8gcrumtcpItgbBJsuCOX88FAF1lcDmGSDAVJkiRJkiRJkiRJkiRJknpq4AJ4Bj6AFbAsOlFCNbABmh9rVXKobA5FboD3gnOlMhS5Ad7KjZbHWOQGuCw2XRJTIm/21+mPToFHhiM/AYtSA2Zg5ABGDmDkAEYOYOQARg5g5ABGDrBk/IvPNbxegRtGjojv/sGgWdZtN2zV+X1Ce2DvYf08PoFzYAdt3K6qd7lm0Q29Ax5KDZLQPfu7+TcLfBgeu16AayZswb7eBTJ2IGMHMnYgYwcydiBjBzJ2IGMH8g80gabEvio2XTJjsbd4Ijibodhf9I9idYRDsdclh8qqpt2Tt7R38ho4KzpRchXuy5IkSZIkSZIkSZIkSZJUwDfowuIn9KZSiwAAAABJRU5ErkJggg==";
//             let pt = './Images' + '/' + 'Dishank.png'
//             console.log(pt)
//             let path = fs.writeFileSync(pt, base64)
//             resolve(pt)
//         } catch (e) {
//             console.log(e)
//         }
//     })
// }

module.exports = {
    //ImageUploads: ImageUploads


    createStore: (data, callBack) => {

        var ID =
            "dj-" +
            Math.random()
                .toString(36)
                .substr(2, 9) +
            "str";

        pool.query(
            `insert into stores(store_id, username, password, store_name, store_image, description )
                values(?,?,?,?,?,?)`,
            [
                ID,
                data.username,
                data.password,
                data.store_name,
                data.store_image,
                data.description
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getStores: callBack => {
        pool.query(
            `select * from stores where store_id != 'Admin'`,
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

    getStoreById: (id, callBack) => {
        pool.query(
            `select * from stores where store_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateStore: (data, callBack) => {
        pool.query(
            `update stores set username=?, password=?, store_name=?, store_image=?, description=?
                 where store_id=?`,
            [data.username, data.password, data.store_name, data.store_image, data.description, data.store_id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteStore: (data, callBack) => {
        pool.query(
            `delete  from stores where store_id = ?`,
            [data.store_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserbyPhone: (phone, callBack) => {
        pool.query(
            `select * from stores where username = ?`,
            [phone],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }


}
