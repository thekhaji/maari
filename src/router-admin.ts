import express from "express";
import agentController from "./controllers/agent.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

const routerAdmin = express.Router();

/** Restaurant **/
routerAdmin.get("/", agentController.goHome);
routerAdmin
    .get("/login", agentController.getLogin)
    .post("/login", agentController.processLogin);
routerAdmin
    .get("/signup", agentController.getSignup)
    .post("/signup", makeUploader("members").single("memberImage"),agentController.processSignup);
routerAdmin.get("/logout", agentController.logout)
routerAdmin.get("/checkAuthSession", agentController.checkAuthSession)

/** Product **/
routerAdmin.get("/product/all", agentController.verifyAgent, productController.getAllProducts);
routerAdmin.post("/product/create", agentController.verifyAgent, makeUploader("products").array("productImages", 5), productController.createNewProduct);
routerAdmin.post("/product/:id", agentController.verifyAgent, productController.updateChosenProduct);

/** User **/
routerAdmin.get("/user/all", agentController.verifyAgent, agentController.getUsers)
routerAdmin.post("/user/edit", agentController.verifyAgent, agentController.updateChosenUser)
export default routerAdmin; 