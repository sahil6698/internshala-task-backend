import {HttpException, Injectable} from '@nestjs/common';
import ReturnVal from '../../lib/returnval';
import UserEntity from "../../../db/entities/user.entity";
import IAuthDetail from "../../interfaces/auth-detail.interface";
import CreateUserDto from "./dto/create-user.dto";
import EUserStatus from "../../enums/user-status.enum";
import EUserRole from "../../enums/user-role.enum";
import RestaurantEntity from "../../../db/entities/restaurant.entity";
import BCrypt from 'bcryptjs';
import AuthService from "../../global/service/auth.service";

@Injectable()
export default class UserService {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }
    public async createUser(createUser: CreateUserDto): Promise<ReturnVal<Partial<UserEntity>>> {
        const user = UserEntity.create({
            name: createUser.name,
            username: createUser.username,
            email: createUser.email,
            password: createUser.password,
            role: createUser.role,
            status: EUserStatus.ACTIVE
        });

        if (user.role === EUserRole.RESTAURANT) {
            if (!createUser.restaurant) {
                return ReturnVal.error('Restaurant Details required for restaurant type user', 400);
            }
            const restaurant = RestaurantEntity.create({
                name: createUser.restaurant.name,
                address: createUser.restaurant.address
            });
            await restaurant.save();
            user.restaurantId = restaurant.id;
        }
        try {
            await user.save();
        } catch (e) {
            if (e.message.includes('duplicate key value')) {
                return ReturnVal.error('Username or email is already in use, please pick another', 400);
            }
            return ReturnVal.error('User could not be registered', 500)
        }
        return ReturnVal.success(user.toJSON(), 'User registered successfully', 201);
    }



    public async login(username: string, password: string): Promise<ReturnVal> {
        const user = await UserEntity.findByUsername(username);
        if (!user) {
            return ReturnVal.error('Invalid credentials', 401)
        }
        const isMatching = await BCrypt.compare(password, user.password);
        if (isMatching) {
            try {
                const token = await this.authService.generateJWTToken(user);
                return ReturnVal.success({ token, ...user.toJSON() });
            } catch (e) {
                return ReturnVal.error('User could not be logged in.');
            }
        } else {
            throw new HttpException('Invalid credentials', 401)
        }
    }

    public async getMe({currentUser}: IAuthDetail): Promise<ReturnVal<Partial<UserEntity>>> {
        return ReturnVal.success(currentUser.toJSON());
    }

}
