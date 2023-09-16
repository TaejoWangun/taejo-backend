import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { Repository } from "typeorm";
import { DeviceEntity } from "./entities/device.entity";
import { UserEntity } from "../users/entities/user.entity";

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>
  ) {}
  async create(createDeviceDto: CreateDeviceDto, uuid: string, userId: number) {
    await this.deviceRepository.insert({
      uuid,
      fcmToken: createDeviceDto.fcmToken,
      name: createDeviceDto.name,
      mode: createDeviceDto.mode,
      startTime: createDeviceDto.startTime,
      endTime: createDeviceDto.endTime,
      alarmCount: createDeviceDto.alarmCount,
      activeStatus: createDeviceDto.activeStatus,
    });
    return "알림 기기가 등록되었습니다.";
  }

  async findAll() {
    return await this.deviceRepository.find({});
  }

  async remove(deleteDeviceDto: DeleteDeviceDto) {
    await this.deviceRepository.delete({
      uuid: deleteDeviceDto.uuid,
    });
    return `This action removes a device`;
  }
}
