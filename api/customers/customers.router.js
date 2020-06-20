const { createCustomer, getCustomerById, getCustomers, updateCustomer, deleteCustomer } = require("./customers.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createCustomer);
router.get("/", checkToken, getCustomers);
router.get("/:id", checkToken, getCustomerById);
router.patch("/", checkToken, updateCustomer);
router.delete("/", checkToken, deleteCustomer);


module.exports = router;


