import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addService, deleteOneService, getOneService, getServices, updateOneService } from "../controller/service.controller.js";

const router = express.Router();


router.post("/add", protectRoute, addService);
router.get("/get", getServices);
router.get("/get/:id", getOneService);
router.delete("/:id", deleteOneService);
router.put("/update-service/:id", protectRoute, updateOneService);



export default router;
