import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { Repository } from "typeorm";
import { DeviceEntity } from "./entities/device.entity";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>
  ) {}
  async create(createDeviceDto: CreateDeviceDto, uuid: string) {
    try {
      const target = await this.deviceRepository.findOne({
        where: { fcmToken: createDeviceDto.fcmToken },
      });
      if (target) {
        return "이미 등록된 기기입니다.";
      } else {
        const result = await this.deviceRepository.insert({
          uuid,
          fcmToken: createDeviceDto.fcmToken,
          name: createDeviceDto.name,
          mode: createDeviceDto.mode,
          startTime: createDeviceDto.startTime,
          endTime: createDeviceDto.endTime,
          alarmCount: createDeviceDto.alarmCount,
          activeStatus: createDeviceDto.activeStatus,
          user: createDeviceDto.user,
        });
        if (result) {
          return "기기가 등록되었습니다.";
        } else {
          return "기기 등록에 실패하였습니다.";
        }
      }
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }

  async findAll() {
    try {
      return await this.deviceRepository
        .createQueryBuilder("device")
        .getRawMany();
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }

  async remove(deleteDeviceDto: DeleteDeviceDto) {
    try {
      const target = await this.deviceRepository.findOne({
        where: { uuid: deleteDeviceDto.uuid },
      });
      if (!target) {
        return "존재하지 않는 기기입니다.";
      }
      const result = await this.deviceRepository.delete({
        uuid: deleteDeviceDto.uuid,
      });
      if (result) {
        return `기기가 삭제되었습니다.`;
      } else {
        return `기기 삭제에 실패하였습니다.`;
      }
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }
  async update(updateDeviceDto: UpdateDeviceDto) {
    try {
      const result = await this.deviceRepository.update(
        { uuid: updateDeviceDto.uuid },
        { fcmToken: updateDeviceDto.fcmToken }
      );
      if (result) return `기기가 재연결 되었습니다.`;
      else `기기 재연결에 실패하였습니다.`;
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }
}
