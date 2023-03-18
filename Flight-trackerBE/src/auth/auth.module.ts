import { GoogleStrategy } from './google-strategy/google.strategy';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: 'ThisIsAbestSecretToHaveInFlightTracker',
      signOptions: { expiresIn: '4h' },
    }),
    UsersModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [GoogleStrategy, JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [GoogleStrategy, JwtStrategy, PassportModule],
})
export class AuthModule {}
