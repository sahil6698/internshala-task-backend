import ETable from "../../app/enums/table.enum";
import ModelEntity from "./ModelEntity";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import EMenuItemType from "../../app/enums/menu-item-type.enum";
import EMenuItemCategory from "../../app/enums/menu-item-category.enum";
import RestaurantEntity from "./restaurant.entity";


@Entity({ name: ETable.MENU })
class MenuItemEntity extends ModelEntity<MenuItemEntity> {

    @Column({name: 'restaurant_id'})
    public restaurantId: number;


    @Column()
    public title: string;

    @Column()
    public type: EMenuItemType;

    @Column()
    public category: EMenuItemCategory;

    @Column()
    public price: number;

    @Column()
    public calories: number;

    @ManyToOne(() => RestaurantEntity, restaurant => restaurant.menuItems)
    @JoinColumn({name: 'restaurant_id'})
    public restaurant: Promise<RestaurantEntity>;

    public toJSON(includes = ['title', 'type','category', 'price', 'calories', 'createdAt','updatedAt', 'id'], skips = []): Partial<MenuItemEntity> {
        return super.toJSON(includes, skips);
    }
}

export default MenuItemEntity;
