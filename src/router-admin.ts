import express from "express";
import agentController from "./controllers/agent.controller";
import productController from "./controllers/product.controller";

const routerAdmin = express.Router();

/** Restaurant **/
routerAdmin.get("/", agentController.goHome);
routerAdmin
    .get("/login", agentController.getLogin)
    .post("/login", agentController.processLogin);
routerAdmin
    .get("/signup", agentController.getSignup)
    .post("/signup", agentController.processSignup);
routerAdmin.get("/logout", agentController.logout)
routerAdmin.get("/checkAuthSession", agentController.checkAuthSession)

/** Product **/
routerAdmin.get("/product/all", agentController.verifyAgent, productController.getAllProducts);
routerAdmin.post("/product/create", agentController.verifyAgent, productController.createNewProduct);
routerAdmin.post("/product/:id", agentController.verifyAgent, productController.updateChosenProduct);

/** User **/

export default routerAdmin; 