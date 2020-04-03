import {Injectable, UnauthorizedException} from '@nestjs/common';
import AuthService from "../../global/service/auth.service";
import ReturnVal from "../../lib/returnval";
import MenuItemEntity from "../../../db/entities/menu-item.entity";
import CreateMenuItemDto from "./dto/create-menu.dto";
import IAuthDetail from "../../interfaces/auth-detail.interface";

@Injectable()
export default class MenuItemService {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async getMenu(restaurantId: number): Promise<ReturnVal<object[]>> {
        let menuItemEntities: MenuItemEntity[];
        if (restaurantId) {
            menuItemEntities = await MenuItemEntity.find({
                where: {restaurantId},
                relations: ['restaurant']
            });
        } else {
            menuItemEntities = await MenuItemEntity.find({
                relations: ['restaurant']
            });
        }
        const entityMap = [] ;
        for (const menuItem of menuItemEntities){
            const restaurant = await menuItem.restaurant;
            entityMap.push({
                id : menuItem.id,
                title: menuItem.title,
                type: menuItem.type,
                category: menuItem.category,
                calories: menuItem.calories,
                price: menuItem.price,
                restaurantName: restaurant.name,
                restaurantId: restaurant.id,
            })
        }
        return ReturnVal.success(entityMap);
    }

    public async createMenuItem(createMenuDto: CreateMenuItemDto, authDetail: IAuthDetail) {
        if (authDetail.currentUser.restaurantId === null ||
            authDetail.currentUser.restaurantId === undefined) {
            throw new UnauthorizedException();
        }
        const menuItem = MenuItemEntity.create({
            ...createMenuDto
        });
        menuItem.restaurantId = authDetail.currentUser.restaurantId;
        await menuItem.save();
        return ReturnVal.success(menuItem.toJSON());
    }
}
