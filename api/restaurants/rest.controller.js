const { create, createRestOwner ,getRestaurants ,getRestById ,updateRestaurants,deleteRestaurants} = require("./rest.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createRestaurant: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Restaurant Added Successfully"
        // data: {}
      });
    });
  },

  createRestOwner: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    createRestOwner(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Restaurant Owner Created Successfully"
        // data: {}
      });
    });
  },

  getRestaurants: (req, res) => {
    getRestaurants((err, results) => {
        if (err) {
            console.log(err);
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Records not found"
            });
        }
        return res.json({
            success: 1,
            data: results
        })
    })
},

getRestById: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    getRestById(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Restaurant Found Sucessfully",
        data:results
      });
    });
},

updateRestaurants: (req, res) => {
  const body = req.body;
  //const salt = genSaltSync(10);
  //body.password = hashSync(body.password, salt);
  updateRestaurants(body, (err, results) => {
      if (err) {
          console.log(err);
          return;
      }
      if (!results) {
          return res.json({
              success: 0,
              message: "Failed to update Restaurant"
          })
      }
      return res.json({
          success: 1,
          message: "Restaurant update Successfully"
      });
  });
},

deleteRestaurants: (req, res) => {
  const data = req.body;
  deleteRestaurants(data, (err, results) => {
      if (err) {
          console.log(err);
          return;
      }
      if (!results) {
          return res.json({
              success: 0,
              message: "Records not found"
          });
      }
      return res.json({
          success: 1,
          message: "Restaurant deleted successfully"
      })
  })
},

};
