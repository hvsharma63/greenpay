const { createItem, get_storeitem_byid, get_all_storeitem, deleteMenuitem, update_storeitem } = require('./store_menu.controller');
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/create_item", checkToken, createItem);
router.get("/get_all_storeitem", checkToken, get_all_storeitem);
router.post("/get_storeitem_byid", checkToken, get_storeitem_byid);
router.patch("/update_storeitem", checkToken, update_storeitem);
router.delete("/delete_menu_item", checkToken, deleteMenuitem);

module.exports = router;
