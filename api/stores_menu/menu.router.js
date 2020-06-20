const { createStoreMenu, getMenu, getMenuByStoreId, deleteMenuStore, updateMenuStore, getItem } = require("./menu.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createStoreMenu);
router.post("/getitem", checkToken, getItem);
router.get("/", checkToken, getMenu);
router.get("/:id", checkToken, getMenuByStoreId);
router.patch("/updatestoremenu", checkToken, updateMenuStore);
router.delete("/delete_menu_item", checkToken, deleteMenuStore);

module.exports = router;


