const pool = require("../../config/database");

var ID =
  "DJ" +
  Math.random()
    .toString(36)
    .substr(2, 9) +
  "_JE";


module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into register(username, email, phone, password, user_role,user_id, wallet_bal)
            values(?,?,?,?,?,?,?)`,
      [
        data.username,
        data.email,
        data.phone,
        data.password,
        data.user_role,
        ID,
        "550"
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUsers: callBack => {
    pool.query(
      `select user_id, username, email, phone from register where user_role != 'Admin'`,
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

  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id, username, email, phone from register where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
      `update register set username=?, email=?, phone=?, password=?
             where id=?`,
      [data.username, data.email, data.phone, data.password, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete  from register where id = ?`,
      [data.id],
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
      `select * from register where phone = ?`,
      [phone],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
