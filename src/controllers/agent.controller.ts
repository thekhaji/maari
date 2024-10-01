import { T } from "../libs/types/common";
import {Response, Request} from "express";
import MemberService from "../models/Member.service";

const agentController: T = {};

agentController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.send("Home Page");
    } catch (err) {
        console.log("Error, goHome:", err);
    }
}

agentController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login Page");
    } catch (err) {
        console.log("Error, getLogin:", err);
    }
}

agentController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.send("Signup Page");
    } catch (err) {
        console.log("Error, getSignup:", err);
    }
}

export default agentController;