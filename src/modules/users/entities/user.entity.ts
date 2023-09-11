import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { NotificationEntity } from "../../notifications/entities/notification.entity";
import { RoleType } from "src/constants/role-type";
import { DeviceEntity } from "../../devices/entities/device.entity";
import { InquiryEntity } from "../../inquiries/entities/inquiry.entity";

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({type:'enum', enum: RoleType, default: RoleType.USER})
    role: RoleType;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => NotificationEntity, (notificationEntity) => notificationEntity.user)
    notifications: NotificationEntity[];

    @OneToMany(()=> DeviceEntity, (deviceEntity)=>deviceEntity.user )
    devices: DeviceEntity[];

    @OneToMany(()=> InquiryEntity, (inquiryEntity)=> inquiryEntity.user)
    inquiries: InquiryEntity[];

}   