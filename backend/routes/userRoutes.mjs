import express from "express";
const router = express.Router();
import tokenVerification from "../Middleware/tokenVerification.mjs";
import { createUserAccount, getAllUsersAccounts, updateUserAccount, deleteUserAccount, userLogin, getLoggedInUserAccount,isAdmin } from "../controller/userController.mjs";

router.get("/user",tokenVerification, getAllUsersAccounts);
router.post("/user", createUserAccount);
router.put("/user/:id", updateUserAccount);
router.delete("/user/:id", deleteUserAccount);
router.post("/user/login", userLogin);
router.get("/user/me", tokenVerification, getLoggedInUserAccount); // Fetch logged-in user's details
router.get('/isAdmin', tokenVerification, isAdmin);

export default router;