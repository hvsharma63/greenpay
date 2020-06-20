const pool = require("../../config/database");

var item_id = 
    "DJ" +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    "_menu";


module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into menu(item_name,item_price,item_qnt,rest_id,item_id)
            values(?,?,?,?,?)`,
      [
        data.name,
        data.price,
        data.qnt,
        data.rest_id,
        item_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getmenu: callBack => {
    pool.query(
      `select *  from menu`,
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

  getMenuById: (data, callBack) => {
    

    pool.query(
      `select * from menu where store_id=?`,
      [
        data.item_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

}
