import JWT from 'jsonwebtoken';
import * as UUIDV4 from 'uuid/v4';
import ReturnVal from '../../lib/ReturnVal';
import UserEntity from "../../../db/entities/user.entity";
import EUserStatus from "../../enums/user-status.enum";

export default class AuthService {

    public async generateJWTToken(user: UserEntity) {
        const payload = {
            user_id: user.id,
            random: UUIDV4,
        };
        return JWT.sign(payload,
            process.env.JSON_WEB_SECRET, // todo
            { expiresIn: '1d',
            });
    }

    public async validateJWTToken(jwtToken: string): Promise<ReturnVal> {
        try {
            const decoded: any = JWT.verify(jwtToken, process.env.JSON_WEB_SECRET);
            const {user_id} = decoded;
            const user = await UserEntity.findOne({where: {id: user_id}});
            if (!user)
                return ReturnVal.error('Invalid authentication token', 401);
            if (user && user.status !== EUserStatus.ACTIVE)
                return ReturnVal.error('Inactive User account');
            return ReturnVal.success(user);
        } catch (e) {
            return ReturnVal.error('Invalid authentication token',  401);
        }
    }
}
