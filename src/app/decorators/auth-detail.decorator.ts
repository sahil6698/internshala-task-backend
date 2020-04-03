import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import UserEntity from '../../db/entities/user.entity';
import { oc } from 'ts-optchain';
import EUserStatus from '../../app/enums/user-status.enum';
import IAuthDetail from '../../app/interfaces/auth-detail.interface';

const AuthDetail = createParamDecorator((data, req): IAuthDetail => {
    const user: UserEntity = req.user;
    const ip: string = oc(req).headers['x-forwarded-for']() || oc<any>(req).connection.remoteAddress('');
    const jwtToken = oc<any>(req).headers.jwttoken('');
    if (!user) {
        throw new UnauthorizedException();
    } else {
        if (user.status !== EUserStatus.ACTIVE) // status not active
        {
            throw new UnauthorizedException(`Your account is ${user.status}`);
        } else {
            return { currentUser: user, currentIp: ip, jwtToken };
        }
    }
});

export default AuthDetail;
