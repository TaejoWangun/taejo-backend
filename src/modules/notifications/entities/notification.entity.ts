import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { DeviceEntity } from "../../devices/entities/device.entity";

@Entity()
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wavURL: string;

  @Column()
  readStatus: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.notifications, {
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @ManyToOne(() => DeviceEntity, (deviceEntity) => deviceEntity.notifications, {
    eager: true,
  })
  @JoinColumn({ name: "uuid" })
  device: DeviceEntity;
}
