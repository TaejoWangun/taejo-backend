import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}
  async findOne(userId: string) {
    return await this.userRepo.findOne({ where: { userId: userId } });
  }

  async findOneWithUserName(userName: string) {
    let user = await this.userRepo.findOne({ where: { email: userName } });

    if (!user) {
      user = await this.userRepo.findOne({ where: { userId: userName } });
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return await this.userRepo.update(id, updateUserDto);
  }

  async findOneWithEmail(email: string) {
    const result = await this.userRepo.findOne({ where: { email: email } });
    // console.log("findOneWithEmail_result.username: " + result.userName);
    // console.log("findOneWithEmail_result.email: " + result.email);
    // console.log("findOneWithEmail_result.userId: " + result.userId);
    return result;
  }

  async findByEmailOrSave(email, userName, userId) {
    // console.log("findByEmailOrSave_username: " + username);
    const foundUser = await this.findOneWithUserName(userName);
    if (foundUser) {
      // console.log("findByEmailOrSave_foundUser.email: " + foundUser.email);
      // console.log(
      //   "findByEmailOrSave_foundUser.username: " + foundUser.userName
      // );
      // console.log("findByEmailOrSave_foundUser.userId: " + foundUser.userId);
      return foundUser;
    }
    const newUser = await this.userRepo.save({
      email,
      userName,
      userId,
    });
    // console.log("findByEmailOrSave_newUser: " + newUser);
    return newUser;
  }
}
