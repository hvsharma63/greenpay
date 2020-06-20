const { create,getmenu,getMenuById} = require("./menu.service");
const { sign } = require("jsonwebtoken");

module.exports = {
  createmenu: (req, res) => {
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
        message: "Menu added Successfully"
        // data: {}
      });
    });
  },

  getmenu: (req, res) => {
    getmenu((err, results) => {
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

    getMenuById: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    getMenuById(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Menu Found Sucessfully",
        data:results
      });
    });
}

}