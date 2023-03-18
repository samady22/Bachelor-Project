import { CreateUserDTO } from './../dto/create-user.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:email')
  getUser(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  createUser(@Body() createuserDto: CreateUserDTO) {
    return this.usersService.createUser(createuserDto);
  }
}
