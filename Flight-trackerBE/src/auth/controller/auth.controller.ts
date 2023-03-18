import { AuthService } from '../service/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { isEmpty } from 'class-validator';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createuserDto: CreateUserDTO) {
    return this.authService.signUp(createuserDto);
  }

  @Post('/signin')
  async signIn(
    @Body() createuserDto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(createuserDto);
    res.location('');
    res.cookie('flight', token.data, {
      maxAge: 4 * 60 * 60 * 1000,
      path: '/',
    });
    return {
      status: HttpStatus.OK,
      message: 'Signed in',
    };
  }

  @Get('/logout')
  @UseGuards(AuthGuard())
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('flight');
    return { message: 'signed out', status: HttpStatus.OK };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const userToken: any = await this.authService.googleLogin(req);
    if (!isEmpty(userToken.data)) {
      res.location('');
      res.cookie('flight', userToken.data, {
        maxAge: 4 * 60 * 60 * 1000,
        path: '/',
      });
      res.redirect('http://localhost:3000/');
    }
  }
}
