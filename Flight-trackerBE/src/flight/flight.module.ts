import { Module } from '@nestjs/common';
import { FlightService } from './service/flight.service';
import { FlightController } from './controller/flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import nodemailer from 'nodemailer';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightService],
  controllers: [FlightController],
  exports: [FlightService],
})
export class FlightModule {}
