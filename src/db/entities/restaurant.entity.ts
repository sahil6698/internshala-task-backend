import ETable from "../../app/enums/table.enum";
import ModelEntity from "./ModelEntity";
import {Column, Entity, OneToMany} from "typeorm";
import UserEntity from "./user.entity";
import MenuItemEntity from "./menu-item.entity";
import OrderEntity from "./order.entity";


@Entity({ name: ETable.RESTAURANT })
class RestaurantEntity extends ModelEntity<RestaurantEntity> {

  @Column()
  public name: string;

  @Column()
  public address: string;

  @OneToMany(() => UserEntity, user => user.restaurant)
  public users: Promise<UserEntity[]>;

  @OneToMany(() => MenuItemEntity, menu => menu.restaurant)
  public menuItems: Promise<MenuItemEntity[]>;

  @OneToMany(() => OrderEntity, order => order.restaurant)
  public orders: Promise<OrderEntity[]>;

  public toJSON(includes = ['name', 'address', 'createdAt','updatedAt', 'id'], skips = []): Partial<RestaurantEntity> {
    return super.toJSON(includes, skips);
  }
}

export default RestaurantEntity;
