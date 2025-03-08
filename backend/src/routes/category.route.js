import express from "express";
import { addCategory, deleteOneCategory, deleteSubCategory, getCategories, updateCategory } from "../controller/category.controller.js";

const router = express.Router();


router.post("/", addCategory);
router.put("/:id", updateCategory);
router.get("/", getCategories);
router.delete("/:id", deleteOneCategory);
router.put("/delete-sub/:id/:subCategory", deleteSubCategory);



export default router;
