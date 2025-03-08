import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addProduct, deleteOneProduct, getOneProduct, getProducts, getProductsByCategory, getProductsbypagination, searchProducts, updateOneProduct } from "../controller/product.controller.js";

const router = express.Router();


router.post("/", addProduct);
router.get("/", getProducts);
router.get("/category", getProducts);
router.get("/pagination", getProductsbypagination);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getOneProduct);
router.delete("/:id", deleteOneProduct);
router.put("/update-product/:id", updateOneProduct);
router.get("/search/ser", searchProducts);


export default router;
