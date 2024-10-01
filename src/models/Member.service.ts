import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";

class MemberService{
    private readonly memberModel;
    constructor(){
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<Member>{
        try {
            const result = await this.memberModel.create(input);
            result.password = "";
            return result;
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default MemberService;