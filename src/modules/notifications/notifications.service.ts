import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "./entities/notification.entity";
import { Repository } from "typeorm";
import {
  InternalServerErrorException,
  NotificationCreateErrorException,
  NotificationNonExistErrorException,
  NotificationDeleteErrorException,
} from "src/exceptionHandler";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const result = await this.notificationRepository.insert({
        wavURL: createNotificationDto.wavURL,
        readStatus: createNotificationDto.readStatus,
        user: createNotificationDto.user,
        device: createNotificationDto.device,
      });
      if (result) {
        return "알림이 등록되었습니다.";
      } else {
        throw "NotificationCreateErrorException";
      }
    } catch (error) {
      if (error == "NotificationCreateErrorException") {
        throw new NotificationCreateErrorException();
      } else throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.notificationRepository
        .createQueryBuilder("notification")
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.notificationRepository
        .createQueryBuilder("notification")
        .where("notification.id = :id", { id })
        .getRawOne();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const target = await this.notificationRepository.findOne({
        where: { id },
      });
      if (!target) {
        throw "NotificationNonExistErrorException";
      }
      const result = await this.notificationRepository.delete({
        id,
      });
      if (result) {
        return `알림이 삭제되었습니다.`;
      } else {
        throw "NotificationDeleteErrorException";
      }
    } catch (error) {
      if (error == "NotificationNonExistErrorException") {
        throw new NotificationNonExistErrorException();
      } else if (error == "NotificationDeleteErrorException") {
        throw new NotificationDeleteErrorException();
      } else throw new InternalServerErrorException();
    }
  }
}
