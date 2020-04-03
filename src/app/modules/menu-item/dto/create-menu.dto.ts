import EMenuItemType from "../../../enums/menu-item-type.enum";
import EMenuItemCategory from "../../../enums/menu-item-category.enum";
import {IsIn, IsNumber, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

class CreateMenuDto {

    @IsString({message: 'Title should be a string'})
    @MinLength(4, {message: 'Title should be minimum length 4'})
    @MaxLength(10, {message: 'Title can have a maximum length of 10'})
    public title: string;

    @IsIn(Object.values(EMenuItemType), {message: 'Please select a valid type'})
    public type: EMenuItemType;

    @IsIn(Object.values(EMenuItemCategory), {message: 'Please select a valid category'})
    public category: EMenuItemCategory;

    @IsNumber({allowNaN: false,
    allowInfinity: false}, {message: 'Price should be a number'})
    @Min(1, {message: 'Price should be minimum 1'})
    @Max(10000, {message: 'Price cannot exceed 10000'})
    public price: number;

    @IsNumber({allowNaN: false,
        allowInfinity: false}, {message: 'Calories should be a number'})
    @Min(1, {message: 'Calories should be minimum 1'})
    @Max(10000, {message: 'Calories cannot exceed 10000'})
    public calories: number;
}

export default CreateMenuDto;
