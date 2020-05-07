import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import Cart from '@modules/stores/infra/typeorm/entities/Cart';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Store, store => store.owner)
  stores: Promise<Store[]>;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
