import express from "express";
import { addContact, deleteMessage, getContacts, updateMessageStatus } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", addContact);
router.get("/", getContacts);
router.delete("/:id", deleteMessage);
router.put("/update/:id", updateMessageStatus);
export default router;
