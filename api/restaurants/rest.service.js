const pool = require("../../config/database");


module.exports = {
  create: (data, callBack) => {

    var ID =
    "rest-" +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    "_dje";

    pool.query(
      `insert into restaurants(rest_id,rest_name,rest_email,rest_add,rest_contact,rest_type,type)
            values(?,?,?,?,?,?,?)`,
      [ID, data.name, data.email, data.add, data.contact,data.rest_type,data.type],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createRestOwner: (data, callBack) => {
    var rest_owner =
      Math.random()
        .toString(36)
        .substr(2, 9) + "_dje";

    pool.query(
      `insert into restaurants_owner(rest_id,rest_owner_name,rest_owner_id,rest_owner_email,rest_owner_password,rest_owner_contact)
            values(?,?,?,?,?,?)`,
      [
        data.rest_id,
        data.name,
        rest_owner,
        data.email,
        data.password,
        data.contact
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getRestaurants: callBack => {
    pool.query(
      `select *  from restaurants`,
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

  getRestById: (data, callBack) => {
    pool.query(
      `select * from restaurants where rest_id=?`,
      [
        data.rest_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateRestaurants: (data, callBack) => {
    pool.query(
      `update restaurants set rest_name=?,rest_add=?,rest_email=?,rest_contact=?
             where rest_id=?`,
      [data.name,data.add,data.email, data.contact, data.rest_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteRestaurants: (data, callBack) => {
    pool.query(
      `delete  from restaurants where rest_id = ?`,
      [data.rest_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

};


