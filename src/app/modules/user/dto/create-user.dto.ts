import {IsEmail, IsIn, IsOptional, IsString, Length, MaxLength, MinLength} from "class-validator";
import EUserRole from "../../../enums/user-role.enum";
import {IsNull} from "typeorm";

export class CreateRestaurantDto {
    @IsString({message: 'Restaurant name must be a valid string'})
    @MinLength(4, {message: 'Restaurant Name should be minimum length 4'})
    @MaxLength(20, {message: 'Restaurant Name can have a maximum length of 20'})
    public name: string;

    @IsString({message: 'Restaurant name Address be a valid string'})
    @MinLength(5, {message: 'Restaurant Address should be minimum length 5'})
    @MaxLength(100, {message: 'Restaurant Address can have a maximum length of 100'})
    public address: string;
}

class CreateUserDto {
    @IsString({message: 'Name must be a valid string'})
    @MinLength(4, {message: 'Name should be minimum length 4'})
    @MaxLength(20, {message: 'Name can have a maximum length of 20'})
    public name: string;

    @IsEmail({}, {message: 'Please provide a valid email'})
    public email: string;

    @IsString({message: 'Username must be a valid string'})
    @MinLength(4, {message: 'Username should be minimum length 4'})
    @MaxLength(15, {message: 'Username can have a maximum length of 15'})
    public username: string;

    @IsString()
    @MinLength(6, {message: 'Password should be minimum length 6'})
    @MaxLength(50, {message: 'Password can have a maximum length of 50'})
    public password: string;


    @IsIn(Object.values(EUserRole), {message: 'Please provide a valid user role'})
    public role: EUserRole;

    @IsOptional()
    public restaurant?: CreateRestaurantDto;
}

export default CreateUserDto;
