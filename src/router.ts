import express from "express";
import memberController from "./controllers/member.controller";

const router = express.Router();

/** MEMBER **/
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post("/member/logout", memberController.verifyAuth, memberController.logout);
router.get("/member/detail", memberController.verifyAuth, memberController.getMemberDetail);
router.get("/member/verifyAuth", memberController.verifyAuth);

/** PRODUCT **/

/** ORDER **/

export default router;