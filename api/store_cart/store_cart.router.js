const { AddtoCart, getCart, deletecart, deletecartbystoreid } = require('./store_cart.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");


router.post('/add_to_cart', checkToken, AddtoCart);
router.post('/get_cart_items', checkToken, getCart);
router.delete('/delete_cart_item_bycartid', checkToken, deletecart);
router.delete('/delete_cart_item_bystoreid', checkToken, deletecartbystoreid);


module.exports = router;
