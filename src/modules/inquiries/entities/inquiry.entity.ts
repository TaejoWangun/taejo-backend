import { InquiryType } from "src/constants";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity()
export class InquiryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "enum", enum: InquiryType, default: InquiryType.COMPLAINTS })
  inquiryType: InquiryType;

  @Column()
  content: string;

  @Column({ nullable: true })
  reply: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.inquiries)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
