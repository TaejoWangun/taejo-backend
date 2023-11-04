import { ModeType } from "src/constants/mode-type";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { NotificationEntity } from "../../notifications/entities/notification.entity";
import { DeviceType } from "src/constants/devices-type";

@Entity()
export class DeviceEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  fcmToken: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: DeviceType, default: DeviceType.OTHERS })
  type: DeviceType;

  @Column({ type: "enum", enum: ModeType, default: ModeType.ALARM })
  mode: ModeType;

  @Column({ type: "timestamp" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;

  @Column()
  activeStatus: Boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.devices, {
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity[];

  @OneToMany(
    () => NotificationEntity,
    (notificationEntity) => notificationEntity.device
  )
  notifications: NotificationEntity[];
}
