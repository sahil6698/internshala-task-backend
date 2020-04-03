import {IsNumber} from "class-validator";

class CreateOrderDto {

    @IsNumber({allowNaN: false,
        allowInfinity: false}, {message: 'Invalid restaurant id'})
    public restaurantId: number;


    @IsNumber({}, {message: 'Invalid dish ID'})
    public item: number;
}
export default CreateOrderDto;
