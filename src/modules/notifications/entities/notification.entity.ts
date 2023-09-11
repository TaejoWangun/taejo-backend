import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    timestamp: Date;


    @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.notifications)
    user: UserEntity
    
    @ManyToOne(() => DeviceEntity, (deviceEntity) => deviceEntity.notifications)
    device : DeviceEntity
}