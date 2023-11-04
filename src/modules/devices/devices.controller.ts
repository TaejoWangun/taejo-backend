import { Controller, Get, Post, Body, Delete, Patch } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { v4 as uuidv4 } from "uuid";

@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    const uuid = uuidv4();

    return this.devicesService.create(createDeviceDto, uuid);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Delete()
  remove(@Body() deleteDeviceDto: DeleteDeviceDto) {
    return this.devicesService.remove(deleteDeviceDto);
  }

  @Patch()
  update(@Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(updateDeviceDto);
  }
}
