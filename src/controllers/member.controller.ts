import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";
import {Response, Request} from "express";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors from "../libs/Errors";

const memberController: T = {};
const memberService = new MemberService();

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const newMember: MemberInput = req.body,
         result: Member = await memberService.signup(newMember);

        res.json({member: result});
    } catch (err) {
        console.log("Error, signup:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body,
         result = await memberService.login(input);

        res.json({member: result});
    } catch (err) {
        console.log("Error, login:", err);
        console.log("Error, signup:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default memberController;