import { T } from "../libs/types/common";
import {Response, Request, NextFunction} from "express";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const agentController: T = {};
const memberService = new MemberService();

agentController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("Error, goHome:", err);
        res.redirect("/admin");
    }
}

agentController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("Error, getSignup:", err);
        res.redirect("/admin");
    }
}

agentController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("Error, getLogin:", err);
        res.redirect("/admin");
    }
}

agentController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup");
        const file = req.file;
        if(!file)
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_RONG);  

        const newMember: MemberInput = req.body;
        newMember.memberImage = file?.path.replace(/\\/g, "/");;
        newMember.memberType = MemberType.AGENT;
        const result = await memberService.processSignup(newMember);

        req.session.member = result;
        req.session.save(()=>{
            res.redirect("/admin/product/all");
        });
    } catch (err) {
        console.log("Error, processSignup:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/signup')</script>`);
    }
}

agentController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        
        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);

        req.session.member = result;
        req.session.save(()=>{
            res.redirect("/admin/product/all");
        });
    } catch (err) {
        console.log("Error, processLogin:", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_RONG;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login')</script>`);
    }
}

agentController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(()=>{
            res.redirect("/admin");
        });
    } catch (err) {
        console.log("Error, logout:", err);
        res.redirect("/admin");
    }
}

agentController.checkAuthSession = async(req: AdminRequest, res: Response) => {
    try {
        console.log("checkAuthSession");
        if(req.session?.member)
            res.send(`Hi, ${req.session.member.memberNick}`);
        else 
            res.send(`${Message.NOT_AUTHENTICATED}`);
    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
}

agentController.verifyAgent = (req: AdminRequest, res: Response, next: NextFunction) =>{
    if(req.session?.member?.memberType === MemberType.AGENT){
        req.member = req.session.member;
        next();
    }
    else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(`<script> alert("${message}"); window.location.replace('admin/login')</script>`);
    }
}


export default agentController;