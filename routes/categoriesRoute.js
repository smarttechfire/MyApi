const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

router.post("/", categoriesController.createCategory);

router.get("/", categoriesController.getAllCategory);

router.put("/:id", categoriesController.updateCategoryById);

router.delete("/:id", categoriesController.deleteCategoryById);

module.exports = router;
