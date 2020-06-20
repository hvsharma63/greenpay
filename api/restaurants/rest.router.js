const {
  createRestaurant,
  createRestOwner,
  getRestaurants,
  getRestById,
  updateRestaurants,
  deleteRestaurants
} = require("./rest.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createRestaurant);
router.get("/", checkToken, getRestaurants);
router.post("/owner", checkToken, createRestOwner);
router.get("/getrestbyid", checkToken, getRestById);
router.patch("/updaterestaurants", checkToken, updateRestaurants);
router.delete("/deleterestaurants", checkToken, deleteRestaurants);

module.exports = router;
