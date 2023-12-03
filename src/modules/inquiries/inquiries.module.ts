import { Module } from "@nestjs/common";
import { InquiriesService } from "./inquiries.service";
import { InquiriesController } from "./inquiries.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InquiryEntity } from "./entities/inquiry.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InquiryEntity])],
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
