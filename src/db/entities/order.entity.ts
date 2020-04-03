import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import ETable from "../../app/enums/table.enum";
import ModelEntity from "../../db/entities/ModelEntity";
import RestaurantEntity from "../../db/entities/restaurant.entity";
import UserEntity from "../../db/entities/user.entity";

@Entity({ name: ETable.ORDERS })
class OrderEntity extends ModelEntity<OrderEntity> {


    @Column({name: 'restaurant_id'})
    public restaurantId: number;


    @Column({name: 'user_id'})
    public userId: number;

    @Column()
    public total: number;

    @Column()
    public item: number;


    @ManyToOne(() => RestaurantEntity, restaurant => restaurant.orders)
    @JoinColumn({ name: 'restaurant_id'})
    public restaurant: Promise<RestaurantEntity>;

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn({ name: 'user_id'})
    public user: Promise<UserEntity>;

    public toJSON(includes = ['total','item', 'createdAt', 'updatedAt', 'id'], skips = []): Partial<OrderEntity> {
        return super.toJSON(includes, skips);
    }

}

export default OrderEntity;
