import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import ETable from "../../app/enums/table.enum";
import ModelEntity from "./ModelEntity";
import {IsEmail, Length} from "class-validator";
import EUserRole from "../../app/enums/user-role.enum";
import EUserStatus from "../../app/enums/user-status.enum";
import RestaurantEntity from "./restaurant.entity";
import OrderEntity from "./order.entity";
import BCrypt from 'bcryptjs';

@Entity({ name: ETable.USERS })
class UserEntity extends ModelEntity<UserEntity> {

  @Length(4, 20)
  @Column()
  public name: string;

  @IsEmail()
  @Column({unique: true})
  public email: string;

  @Length(4, 10)
  @Column({ unique: true })
  public username: string;

  @Length(6, 30)
  @Column()
  public password: string;

  @Column({ type: 'varchar' })
  public role: EUserRole;

  @Column({ type: 'varchar' })
  public status: EUserStatus;

  @Column({name: 'restaurant_id', nullable: true})
  public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, restaurant => restaurant.users)
  @JoinColumn({ name: 'restaurant_id'})
  public restaurant: Promise<RestaurantEntity>;

  @OneToMany(() => OrderEntity, order => order.user)
  public orders: Promise<OrderEntity[]>;

  @BeforeInsert()
  public async beforeInsertHooks() {
    this.username = this.username.toLowerCase();
    this.email = this.email.toLowerCase();
    this.password = BCrypt.hashSync(this.password, 10)
  }

  public toJSON(includes = ['name','email', 'username', 'role', 'status', 'createdAt', 'updatedAt', 'id'], skips = []): Partial<UserEntity> {
    return super.toJSON(includes, skips);
  }

  public static async findByEmail(email: string): Promise<UserEntity> {
    return UserEntity.findOne({where: {email}});
  }

  public static async findByUsername(username: string): Promise<UserEntity> {
    return UserEntity.findOne({where: {username}});
  }

}

export default UserEntity;
