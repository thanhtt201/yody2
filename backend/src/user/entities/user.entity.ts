import { RoleType } from 'src/share/enum/role-type.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.CUSTOMER,
  })
  role: string;
}
