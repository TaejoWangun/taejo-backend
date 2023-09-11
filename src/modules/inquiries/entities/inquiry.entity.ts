import { InquiryType } from "src/constants";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity()
export class InquiryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({type: 'enum', enum: InquiryType, default: InquiryType.COMPLAINTS})
    inquiryType: InquiryType;

    @Column()
    content: string;

    @ManyToOne(()=> UserEntity, (userEntity)=>userEntity.inquiries)
    user: UserEntity

}