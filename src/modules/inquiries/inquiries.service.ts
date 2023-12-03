import { Injectable } from "@nestjs/common";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { UpdateInquiryDto } from "./dto/update-inquiry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { InquiryEntity } from "./entities/inquiry.entity";
import { Repository } from "typeorm";

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(InquiryEntity)
    private readonly inquiryRepository: Repository<InquiryEntity>
  ) {}
  async create(createInquiryDto: CreateInquiryDto) {
    const result = await this.inquiryRepository.insert({
      name: createInquiryDto.name,
      email: createInquiryDto.email,
      inquiryType: createInquiryDto.inquiryType,
      content: createInquiryDto.content,
    });

    if (result) {
      return "저장되었습니다";
    }
  }

  findAll() {
    return this.inquiryRepository.find();
  }

  findOne(id: number) {
    return this.inquiryRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateInquiryDto: UpdateInquiryDto) {
    return `This action updates a #${id} inquiry`;
  }

  remove(id: number) {
    return `This action removes a #${id} inquiry`;
  }
}
