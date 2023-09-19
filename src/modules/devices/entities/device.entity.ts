import { ModeType } from "src/constants/mode-type";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { NotificationEntity } from "../../notifications/entities/notification.entity";

@Entity()
export class DeviceEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  fcmToken: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: ModeType, default: ModeType.ALARM })
  mode: ModeType;

  @Column({ type: "timestamp" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;

  @Column()
  alarmCount: number;

  @Column()
  activeStatus: Boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.devices)
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  user: UserEntity;

  @OneToMany(
    () => NotificationEntity,
    (notificationEntity) => notificationEntity.device
  )
  notifications: NotificationEntity[];
}
