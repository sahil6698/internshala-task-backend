import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { oc } from 'ts-optchain';
import UserEntity from '../../db/entities/user.entity';
import AuthService from "../global/service/auth.service";
import ReturnVal from "../lib/returnval";


class AuthenticationGuard implements CanActivate {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwtToken = await oc<any>(request).headers.authorization();
        const user: UserEntity = await this.validateJWTToken(jwtToken);
        if (user){
            request.jwtToken = jwtToken;
            request.user = user;
            return true;
        } else {
            return false;
        }
    }

    public async validateJWTToken(token: string): Promise<UserEntity> {
        const vr: ReturnVal = await this.authService.validateJWTToken(token);
        if (vr.success)
            return vr.data;
        else throw new UnauthorizedException(vr.message);
    }
}

export default AuthenticationGuard;
