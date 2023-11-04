import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";
import { Repository } from "typeorm";
import { DeviceEntity } from "./entities/device.entity";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import {
  DeviceDeleteErrorException,
  DeviceNotExistException,
  DeviceReconnectErrorException,
  DevicesErrorException,
  DevicesExistException,
  InternalServerErrorException,
} from "src/exceptionHandler";

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
        throw "DevicesExistException";
      } else {
        const result = await this.deviceRepository.insert({
          uuid,
          fcmToken: createDeviceDto.fcmToken,
          name: createDeviceDto.name,
          mode: createDeviceDto.mode,
          type: createDeviceDto.type,
          startTime: createDeviceDto.startTime,
          endTime: createDeviceDto.endTime,
          activeStatus: createDeviceDto.activeStatus,
          user: createDeviceDto.user,
        });
        if (result) {
          return "기기가 등록되었습니다.";
        } else {
          throw "DevicesErrorException";
        }
      }
    } catch (error) {
      if (error == "DevicesExistException") throw new DevicesExistException();
      else if (error == "DevicesErrorException")
        throw new DevicesErrorException();
      else throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.deviceRepository
        .createQueryBuilder("device")
        .getRawMany();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async remove(deleteDeviceDto: DeleteDeviceDto) {
    try {
      const target = await this.deviceRepository.findOne({
        where: { uuid: deleteDeviceDto.uuid },
      });
      if (!target) {
        throw "DeviceNotExistException";
      }
      const result = await this.deviceRepository.delete({
        uuid: deleteDeviceDto.uuid,
      });
      if (result) {
        return `기기가 삭제되었습니다.`;
      } else {
        throw "DeviceDeleteErrorException";
      }
    } catch (error) {
      if (error == "DeviceNotExistException") {
        throw new DeviceNotExistException();
      } else if ((error = "DeviceDeleteErrorException")) {
        throw new DeviceDeleteErrorException();
      } else throw new InternalServerErrorException();
    }
  }
  async update(updateDeviceDto: UpdateDeviceDto) {
    try {
      const result = await this.deviceRepository.update(
        { uuid: updateDeviceDto.uuid },
        { fcmToken: updateDeviceDto.fcmToken }
      );
      if (result) return `기기가 재연결 되었습니다.`;
      throw "DeviceReconnectErrorException";
    } catch (error) {
      if (error == "DeviceReconnectErrorException") {
        throw new DeviceReconnectErrorException();
      } else throw new InternalServerErrorException();
    }
  }
}
