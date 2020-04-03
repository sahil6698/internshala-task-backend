import {HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import IAuthDetail from "../../interfaces/auth-detail.interface";
import ReturnVal from "../../lib/returnval";
import OrderEntity from "../../../db/entities/order.entity";
import EUserRole from "../../enums/user-role.enum";
import CreateOrderDto from "./dto/create-order.dto";
import RestaurantEntity from "../../../db/entities/restaurant.entity";
import MenuItemEntity from "../../../db/entities/menu-item.entity";
import {In} from "typeorm";

@Injectable()
class OrderService {

    public async getOrders(authDetail: IAuthDetail):
        Promise<ReturnVal<object[]>> {
        const orderEntitiesMap =  [];
        let orderEntities: OrderEntity[];
        const {currentUser} = authDetail;
        if (currentUser.role === EUserRole.RESTAURANT) {
            orderEntities = await OrderEntity.find({
                where: {
                    restaurantId: currentUser.restaurantId
                },
                relations: ['user']
            });


        } else {
            orderEntities = await OrderEntity.find({
                where: {
                    userId: currentUser.id
                },
                relations: ['user']
            });
        }
        for (const order of orderEntities) {
            const user = await order.user;
            const menuItem = await MenuItemEntity.findOne({
                where: {
                    id: order.item
                }
            });
            orderEntitiesMap.push({
                orderId: order.id,
                email: user.email,
                item: menuItem.title,
                total: order.total,
            })
        }
        return ReturnVal.success(orderEntitiesMap);
    }

    public async createOrder(
        authDetail: IAuthDetail, createOrderDto: CreateOrderDto): Promise<ReturnVal<Partial<OrderEntity>>>
    {
        if (authDetail.currentUser.role === 'restaurant') {
            throw new HttpException('You are not authorized to make this purchase', 401);
        }
        const restaurant = await RestaurantEntity.findOne(createOrderDto.restaurantId);
        if (!restaurant) {
            throw new HttpException('Invalid Restaurant Id', 400);
        }
        if (authDetail.currentUser.role === EUserRole.RESTAURANT) {
            throw new UnauthorizedException();
        }
        const itemEntity = await MenuItemEntity.findOne(createOrderDto.item);
        if (!itemEntity) {
            throw new HttpException('Invalid Menu Item, order could not be created', 400)
        }
        const orderTotal = itemEntity.price;

        const orderEntity = await OrderEntity.create({
            item: createOrderDto.item,
            total: orderTotal,
            userId: authDetail.currentUser.id,
            restaurantId: createOrderDto.restaurantId,
        });
        await orderEntity.save();
        return ReturnVal.success(orderEntity.toJSON());
    }
}
export default OrderService;
