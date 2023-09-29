import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "./entities/notification.entity";
import { Repository } from "typeorm";

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
        return "알림 등록에 실패하였습니다.";
      }
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }

  async findAll() {
    try {
      return await this.notificationRepository
        .createQueryBuilder("notification")
        .getRawMany();
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }

  async findOne(id: number) {
    try {
      return await this.notificationRepository
        .createQueryBuilder("notification")
        .where("notification.id = :id", { id })
        .getRawOne();
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }

  async remove(id: number) {
    try {
      const target = await this.notificationRepository.findOne({
        where: { id },
      });
      if (!target) {
        return "존재하지 않는 알림입니다.";
      }
      const result = await this.notificationRepository.delete({
        id,
      });
      if (result) {
        return `알림이 삭제되었습니다.`;
      } else {
        return `알림 삭제에 실패하였습니다.`;
      }
    } catch (error) {
      return "일시적인 오류가 발생하였습니다.";
    }
  }
}
