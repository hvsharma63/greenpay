const { createStore, login, getStores, updateStores, getStoreById, deleteStore, ImageUpload } = require("./stores.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createStore);
//router.get("/getImagedemo", ImageUpload);
router.get("/", checkToken, getStores);
router.get("/:id", checkToken, getStoreById);
router.patch("/updatestore", checkToken, updateStores);
router.delete("/", checkToken, deleteStore);
router.post("/login", login);


module.exports = router;


