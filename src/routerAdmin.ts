import express from "express";
import agentController from "./controllers/agent.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", agentController.goHome);

routerAdmin.get("/login", agentController.getLogin);

routerAdmin.get("/signup", agentController.getSignup);

export default routerAdmin;