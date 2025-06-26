import exprees from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createContact } from "../controller/contactController.js";

const router =  exprees.Router();

router.post("/contact_message", createContact);

export default router;