import { User } from './../user.entity';
import { CreateUserDTO } from './../dto/create-user.dto';
import {
  Injectable,
  HttpStatus,
  ConflictException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    const { name, last_name, email, password } = createUserDto;
    // generate salt
    const salt = await bcrypt.genSalt();
    // hashing password
    const hash = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      name,
      last_name,
      email,
      password: hash,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      //duplicate code from nestjs
      if (error.code === '23505') {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return {
      status: HttpStatus.CREATED,
      message: 'user created',
      data: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
    };
  }

  async getUserByEmail(email: any) {
    const found = await this.userRepository.findOneBy({ email });
    if (!found) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: [],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { status: HttpStatus.FOUND, message: 'user found', data: found };
  }
}
