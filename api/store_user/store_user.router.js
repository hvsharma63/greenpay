const { createStore, login, store_list, getStoreById, updateStore, deleteStore } = require("./store_user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createStoreValidationRules, storeExistValidationRule, validate } = require('./../../auth/validation')

router.post("/create_store", checkToken, createStoreValidationRules(), validate, createStore);
//router.get("/getImagedemo", ImageUpload);
// router.get("/", checkToken, getStores);
// router.get("/:id", checkToken, getStoreById);
router.patch("/update_store", checkToken, storeExistValidationRule(), validate, updateStore);
router.delete("/delete_store", checkToken,storeExistValidationRule(), validate, deleteStore);
router.get("/get_all_stores", checkToken, store_list);
router.post("/get_stores_byid", checkToken, getStoreById);
router.post("/store_login", login);


module.exports = router;
