import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../flight.entity';
import nodemailer from 'nodemailer';
import mailGen from 'mailgen';
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async getAllFlights() {
    const flights = await this.flightRepository
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.user_', 'user')
      .select([
        'flight.id',
        'user.id',
        'flight.number',
        'flight.status',
        'flight.aircraft',
        'flight.airline',
      ])
      .distinctOn(['flight.number'])
      .getMany();
    if (!flights.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No flight data found`,
          data: [],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    flights.map((element: any) => {
      element.aircraft = element.aircraft.model;
      element.airline = element.airline.name;
    });
    return {
      status: HttpStatus.FOUND,
      message: 'all tickets retrevied',
      data: flights,
    };
  }

  async saveFlight(saveFlightDto: any) {
    const flight = this.flightRepository.create(saveFlightDto);
    try {
      await this.flightRepository.save(flight);
    } catch (error) {
      //duplicate code from nestjs
      if (error.code === '23505') {
        throw new ConflictException('flight already saved');
      } else {
        throw new InternalServerErrorException();
      }
    }

    let config = {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    };
    let transport = nodemailer.createTransport(config);

    let mailGenerator = new mailGen({
      theme: 'salted',
      product: {
        name: 'Flight Tracker',
        link: 'http://localhost:3000/',
      },
    });

    let response: any = {
      body: {
        name: `${saveFlightDto.user.name + ' ' + saveFlightDto.user.last_name}`,
        intro: `Flight ${saveFlightDto.number} has been saved`,
        table: {
          data: [
            {
              Flight_number: saveFlightDto.number,
              Aircraft: saveFlightDto.aircraft.model,
              Airline: saveFlightDto.airline.name,
              Status: saveFlightDto.status,
            },
          ],
        },
        outro: 'Thank you for using Flight Tracker!',
      },
    };

    let mail = mailGenerator.generate(response);
    let message = {
      from: process.env.GMAIL,
      to: `${saveFlightDto.user.email}`,
      subject: `Fligh ${saveFlightDto.number}`,
      html: mail,
    };
    const sent = await transport.sendMail(message);

    return {
      statusCode: HttpStatus.OK,
      message: 'flight saved',
      data: flight,
    };
  }

  async getFlightsByUemail(email) {
    const found = await this.flightRepository
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.user_', 'user')
      .select([
        'flight.id',
        'user.id',
        'flight.number',
        'flight.status',
        'flight.aircraft',
        'flight.airline',
      ])
      .distinctOn(['flight.number'])
      .where('user.email=:email', { email: email })
      .getMany();

    if (!found.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No flight data found for user with id ${email}`,
          data: [],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    found.map((element: any) => {
      element.aircraft = element.aircraft.model;
      element.airline = element.airline.name;
    });
    return { status: HttpStatus.FOUND, message: 'my tickets', data: found };
  }

  async getFlightsByFlighNum(flightNumber) {
    const found = await this.flightRepository
      .createQueryBuilder('flight')
      .select([
        'flight.id',
        'flight.number',
        'flight.share_id',
        'flight.status',
        'flight.aircraft',
        'flight.airline',
        'flight.departure',
        'flight.arrival',
        'flight.greatCircleDistance',
      ])
      .orderBy('flight.id', 'ASC')
      .where('flight.number=:fNumber', { fNumber: flightNumber })
      .getMany();

    if (!found.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No flight data found for flight with flight number ${flightNumber}`,
          data: [],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.FOUND,
      message: 'flight successfully retrieved',
      data: found,
    };
  }

  async getSharedFlight(sharedId) {
    const found = await this.flightRepository
      .createQueryBuilder('flight')
      .select([
        'flight.id',
        'flight.share_id',
        'flight.number',
        'flight.status',
        'flight.aircraft',
        'flight.airline',
        'flight.departure',
        'flight.arrival',
        'flight.greatCircleDistance',
      ])
      .orderBy('flight.id', 'ASC')
      .where('flight.share_id=:share_id', { share_id: sharedId })
      .getMany();

    if (!found.length) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No flight data found for flight with this link`,
          data: [],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.FOUND,
      message: 'Shared link successfully retrieved',
      data: found,
    };
  }

  async deleteFlight(shareId) {
    const flight = await this.flightRepository
      .createQueryBuilder('flights')
      .delete()
      .from(Flight)
      .where('flights.share_id = :shareId', { shareId: shareId })
      .execute();
    if (flight.affected === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Flight not found to deleted',
        data: [],
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Flight successfully deleted',
      data: [],
    };
  }
}
