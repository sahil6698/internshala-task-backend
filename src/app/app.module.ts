import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import UserModule from "./modules/user/user.module";
import AuthService from "./global/service/auth.service";
import UserEntity from "../db/entities/user.entity";
import MenuItemEntity from "../db/entities/menu-item.entity";
import RestaurantEntity from "../db/entities/restaurant.entity";
import OrderEntity from "../db/entities/order.entity";
import OrderModule from "./modules/order/order.module";
import MenuItemModule from "./modules/menu-item/menu-item.module";
@Module({

  imports: [
      AuthService,
      UserModule,
      OrderModule,
      MenuItemModule,
      TypeOrmModule.forRoot({
          entities: [
              UserEntity,
              MenuItemEntity,
              RestaurantEntity,
              OrderEntity
          ],
          type: 'postgres',
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          synchronize: true,
          port: 5432,
          host: 'process.env.DB_HOST',
          database: process.env.DB_NAME
      })
  ]
})
export class AppModule {}
