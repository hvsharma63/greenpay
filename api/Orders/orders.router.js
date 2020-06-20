const { createOrder, getOrders, getOrdersByStoreId, getSales, getOrderbyStoreCount, addTocart, getCart, deletecart, deletecartbystoreid } = require("./orders.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createOrder);
// // router.get("/getImage", ImageUpload);
router.get("/", checkToken, getOrders);
router.post("/orderbystore", checkToken, getOrdersByStoreId);
router.delete("/deletecartbystore", checkToken, deletecartbystoreid)
router.delete("/removecart", checkToken, deletecart);
router.post("/addtocart", checkToken, addTocart);
router.post("/getcart", checkToken, getCart);
router.post("/salesbyid", checkToken, getOrderbyStoreCount);
router.get("/getsales", checkToken, getSales);


module.exports = router;
