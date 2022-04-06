import { encryptPassword, isPasswordMatch } from './../share/utils/bcrytp.util';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { getManager, Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  private sanitizeUser(user: User): Partial<User> {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };
  }

  async createUser(dto: RegisterDto): Promise<any> {
    try {
      const { email, password } = dto;

      const userFound = await this.userRepo.findOne({ email });
      if (userFound) {
        return 'not register';
      }

      const encryptedPassword = encryptPassword(password);

      // const expiredTime = new Date(
      //   Date.now() + 10 * 86400000,
      // ).getTime();

      await getManager().transaction(async (entityManager) => {
        const newUser = entityManager.getRepository(User).create({
          ...dto,
          email,
          password: encryptedPassword,
        });

        await entityManager.getRepository(User).save(newUser);
      });

      return 'success';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(dto: LoginDto): Promise<Partial<User>> {
    const { email, password } = dto;

    try {
      const user = await this.userRepo.findOne({ email });
      if (!user) {
        throw new HttpException('Không tìm thấy email', HttpStatus.BAD_REQUEST);
      }

      if (isPasswordMatch(password, user.password)) {
        return this.sanitizeUser(user);
      } else {
        throw new HttpException('Sai mật khẩu', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    return await this.userRepo.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    const data = await this.userRepo.find();

    const result = data.map((item) => {
      return {
        id: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        phone: item.phone,
      } as any;
    });
    return result;
  }
}
