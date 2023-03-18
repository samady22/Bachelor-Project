import { isEmpty } from 'class-validator';
import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/service/users.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }

  async signIn(createUserDTO: CreateUserDTO) {
    const { email, password } = createUserDTO;
    const user = this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, (await user).data.password))) {
      const payLoad = {
        id: (await user).data.id,
        name: (await user).data.name,
        last_name: (await user).data.last_name,
        email,
      };
      const accessToken = this.jwtService.sign(payLoad);
      return {
        status: HttpStatus.FOUND,
        message: 'Signed in',
        data: accessToken,
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Please check your login credentials',
          data: [],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Please check your login credentials',
          data: [],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // const foundUser = await this.usersService.getUserByEmail(req.user.email);
    const foundUser = await this.userRepository.findOneBy({
      email: req.user.email,
    });

    if (foundUser) {
      const payLoad = {
        id: foundUser.id,
        name: foundUser.name,
        last_name: foundUser.last_name,
        email: foundUser.email,
      };
      const accessToken = this.jwtService.sign(payLoad);
      return {
        status: HttpStatus.FOUND,
        message: 'Signed in',
        data: accessToken,
      };
    } else {
      const userDto = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        last_name: req.user.last_name,
        password: '',
      };
      const user = this.userRepository.create(userDto);
      await this.userRepository.save(user);
      const payLoad = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      };
      const accessToken = this.jwtService.sign(payLoad);
      return {
        status: HttpStatus.CREATED,
        message: 'Signed in',
        data: accessToken,
      };
    }
  }
}
