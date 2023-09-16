import { Controller, Get, Post, Body, Delete } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { v4 as uuidv4 } from "uuid";

@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post("/alert")
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const uuid = uuidv4();
    const userId = 1;
    return await this.devicesService.create(createDeviceDto, uuid, userId);
  }

  @Get("/alert")
  async findAll() {
    const userId = 1;
    return await this.devicesService.findAll();
  }

  @Delete("/alert")
  async remove(@Body() deleteDeviceDto: DeleteDeviceDto) {
    return await this.devicesService.remove(deleteDeviceDto);
  }
}
