import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

// 실패 코드 : 1의 자리 "1" 로 통일

// devices : 100의 자리 1
// notifications : 100의 자리 2

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(
      `{code : 0, message: "일시적인 오류가 발생했습니다."}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export class DevicesErrorException extends HttpException {
  constructor() {
    super(
      `{code : 101, message: "기기 등록에 실패하였습니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}

export class DevicesExistException extends HttpException {
  constructor() {
    super(
      `{code : 102, message: "이미 등록된 기기입니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}
export class DeviceDeleteErrorException extends HttpException {
  constructor() {
    super(
      `{code : 111, message: "기기 삭제에 실패하였습니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}
export class DeviceNotExistException extends HttpException {
  constructor() {
    super(
      `{code : 112, message: "존재하지 않는 기기입니다."}`,
      HttpStatus.NOT_FOUND
    );
  }
}
export class DeviceReconnectErrorException extends HttpException {
  constructor() {
    super(
      `{code : 121, message: "기기 재연결에 실패하였습니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}
export class NotificationCreateErrorException extends HttpException {
  constructor() {
    super(
      `{code : 201, message: "알림 등록에 실패하였습니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}

export class NotificationDeleteErrorException extends HttpException {
  constructor() {
    super(
      `{code : 211, message: "알림 삭제에 실패하였습니다."}`,
      HttpStatus.BAD_REQUEST
    );
  }
}

export class NotificationNonExistErrorException extends HttpException {
  constructor() {
    super(
      `{code : 212, message: "존재하지 않는 알림입니다."}`,
      HttpStatus.NOT_FOUND
    );
  }
}
