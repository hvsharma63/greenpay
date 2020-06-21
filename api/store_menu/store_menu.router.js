const { createItem, get_storeitem_byid, get_all_storeitem, deleteMenuitem, update_storeitem } = require('./store_menu.controller');
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createStoreItemValidation, existValidationRule, validate } = require('./../../auth/validation')


router.post("/create_item", checkToken, createStoreItemValidation(), validate, createItem);
router.get("/get_all_storeitem", checkToken, get_all_storeitem);
router.post("/get_storeitem_byid", checkToken, get_storeitem_byid);
router.patch("/update_storeitem", checkToken, existValidationRule('store_item'), validate, update_storeitem);
router.delete("/delete_menu_item", checkToken, existValidationRule('store_item'), validate, deleteMenuitem);

module.exports = router;
