import express from "express";
import agentController from "./controllers/agent.controller";

const routerAdmin = express.Router();

/** Restaurant **/
routerAdmin.get("/", agentController.goHome);
routerAdmin
    .get("/login", agentController.getLogin)
    .post("/login", agentController.processLogin);
routerAdmin
        .get("/signup", agentController.getSignup)
        .post("/signup", agentController.processSignup);

/** Product **/
/** User **/

export default routerAdmin;