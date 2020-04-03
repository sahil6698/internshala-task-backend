import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import ReturnVal from "../../lib/returnval";
import AuthenticationGuard from "../../guards/authentication.guard";
import OrderService from "./order.service";
import AuthDetail from "../../decorators/auth-detail.decorator";
import IAuthDetail from "../../interfaces/auth-detail.interface";
import OrderEntity from "../../../db/entities/order.entity";
import ValidationPipe from "../../pipes/validation.pipes";
import CreateOrderDto from "./dto/create-order.dto";

@Controller('order')
class OrderController {

    constructor(private readonly orderService: OrderService) {}


    @Get('')
    @UseGuards(AuthenticationGuard)
    public async getOrders(@AuthDetail() authDetail: IAuthDetail):
        Promise<ReturnVal<object[]>> {
        return this.orderService.getOrders(authDetail);
    }

    @Post()
    @UseGuards(AuthenticationGuard)
    public async createOrder(
        @AuthDetail() authDetail: IAuthDetail,
        @Body(new ValidationPipe()) createOrderDto: CreateOrderDto
    ): Promise<ReturnVal<Partial<OrderEntity>>> {
        return this.orderService.createOrder(authDetail, createOrderDto)
    }
}
export default OrderController;
