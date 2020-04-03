import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import UserService from "./user.service";
import ReturnVal from "../../lib/returnval";
import UserEntity from "../../../db/entities/user.entity";
import AuthDetail from "../../decorators/auth-detail.decorator";
import IAuthDetail from "../../interfaces/auth-detail.interface";
import CreateUserDto from "./dto/create-user.dto";
import LoginDto from "./dto/login.dto";
import ValidationPipe from "../../pipes/validation.pipes";
import AuthenticationGuard from "../../guards/authentication.guard";
@Controller('user')
export default class UserController {
    constructor(private readonly userService: UserService) {}


    @Get('')
    @UseGuards(AuthenticationGuard)
    public async getMe(@AuthDetail() authDetail: IAuthDetail): Promise<ReturnVal<Partial<UserEntity>>> {
        return this.userService.getMe(authDetail);
    }
    @Post('login')
    public async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
        return this.userService.login(loginDto.username, loginDto.password)
    }

    @Post('')
    public async createUser(@Body(new ValidationPipe()) userDetails: CreateUserDto): Promise<ReturnVal<object>> {
        return this.userService.createUser(userDetails);
    }
}
