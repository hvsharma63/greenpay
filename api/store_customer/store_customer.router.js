const { createCustomer, get_all_customer, get_customer_byid, delete_customer_byid, updateCustomer } = require('./store_customer.controller');
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/create_customer", checkToken, createCustomer);
router.get("/get_all_customer", checkToken, get_all_customer);
router.post("/get_customer_byid", checkToken, get_customer_byid);
router.delete("/delete_customer_byid", checkToken, delete_customer_byid);
router.patch("/update_customer_byid", checkToken, updateCustomer);

module.exports = router;