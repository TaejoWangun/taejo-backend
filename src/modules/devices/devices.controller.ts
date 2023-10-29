import { Controller, Get, Post, Body, Delete, Patch } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { v4 as uuidv4 } from "uuid";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("devices")
@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const uuid = uuidv4();

    return this.devicesService.create(createDeviceDto, uuid);
  }

  @Get()
  async findAll() {
    return await this.devicesService.findAll();
  }

  @Delete()
  async remove(@Body() deleteDeviceDto: DeleteDeviceDto) {
    return await this.devicesService.remove(deleteDeviceDto);
  }

  @Patch()
  async update(@Body() updateDeviceDto: UpdateDeviceDto) {
    return await this.devicesService.update(updateDeviceDto);
  }
}
