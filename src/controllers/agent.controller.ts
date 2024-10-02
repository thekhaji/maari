import { T } from "../libs/types/common";
import {Response, Request} from "express";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const agentController: T = {};
const memberService = new MemberService();

agentController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("Error, goHome:", err);
    }
}

agentController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("Error, getSignup:", err);
    }
}

agentController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("Error, getLogin:", err);
    }
}

agentController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup");
        console.log("body:", req.body);
        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.AGENT;
        const result = await memberService.processSignup(newMember);

        req.session.member = result;
        req.session.save(()=>{
            res.send(result);
        });
    } catch (err) {
        console.log("Error, processSignup:", err);
        res.send(err);
    }
}

agentController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);

        req.session.member = result;
        req.session.save(()=>{
            res.send(result);
        });
    } catch (err) {
        console.log("Error, processLogin:", err);
        res.send(err);
    }
}





export default agentController;