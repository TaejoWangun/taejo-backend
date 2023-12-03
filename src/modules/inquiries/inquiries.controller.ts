import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InquiriesService } from "./inquiries.service";
import { CreateInquiryDto } from "./dto/create-inquiry.dto";
import { UpdateInquiryDto } from "./dto/update-inquiry.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("inquiries")
@Controller("inquiries")
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /**
   * save inquiry from non-login user
   * @param createInquiryDto
   */
  @Public()
  @Post()
  create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiriesService.create(createInquiryDto);
  }

  @Get()
  findAll() {
    return this.inquiriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.inquiriesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateInquiryDto: UpdateInquiryDto) {
    return this.inquiriesService.update(+id, updateInquiryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.inquiriesService.remove(+id);
  }
}
