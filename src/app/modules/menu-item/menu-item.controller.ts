import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import ReturnVal from "../../lib/returnval";
import AuthenticationGuard from "../../guards/authentication.guard";
import MenuItemService from "./menu-item.service";
import MenuItemEntity from "../../../db/entities/menu-item.entity";
import ValidationPipe from "../../pipes/validation.pipes";
import CreateMenuDto from "./dto/create-menu.dto";
import AuthDetail from "../../decorators/auth-detail.decorator";
import IAuthDetail from "../../interfaces/auth-detail.interface";

@Controller('menu-item')
export default class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) {}


    @Get('')
    public async getMe(@Query('restaurantId') restaurantId: number):
        Promise<ReturnVal<Partial<MenuItemEntity>[]>> {
        return this.menuItemService.getMenu(restaurantId);
    }

    @Post('')
    @UseGuards(AuthenticationGuard)
    public async createMenu(
        @Body(new ValidationPipe()) createMenuDto: CreateMenuDto,
        @AuthDetail() authDetail: IAuthDetail
    ):
        Promise<ReturnVal<Partial<MenuItemEntity>>> {
        return this.menuItemService.createMenuItem(createMenuDto, authDetail);
    }



}
