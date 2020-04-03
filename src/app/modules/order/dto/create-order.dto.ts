import {IsNumber} from "class-validator";

class CreateOrderDto {

    @IsNumber({}, {message: 'Invalid restaurant id'})
    public restaurantId: number;


    @IsNumber({}, {message: 'Invalid dish ID'})
    public item: number;
}
export default CreateOrderDto;
