const { createOrder, getOrder, getOrderbyid, getDashboard, getDashboardby_id } = require('./store_order.controller');
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/create_order", checkToken, createOrder);
router.get("/get_all_orders", checkToken, getOrder);
router.post("/get_all_ordersbyid", checkToken, getOrderbyid);
router.get("/get_dashboard", checkToken, getDashboard);
router.post("/get_dashboardbyid", checkToken, getDashboardby_id)

module.exports = router;
