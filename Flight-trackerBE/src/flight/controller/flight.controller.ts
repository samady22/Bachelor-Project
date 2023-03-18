import { FlightService } from './../service/flight.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { SaveFlightDTO } from '../dto/save-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Get('/:number')
  @UseGuards(AuthGuard('jwt'))
  getFlight(@Param('number') flightNumber: string) {
    const options = {
      method: 'GET',
      url: 'https://aerodatabox.p.rapidapi.com/flights/number/' + flightNumber,
      params: { withAircraftImage: 'false', withLocation: 'false' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        return {
          status: HttpStatus.OK,
          message: 'flight data fetched successfully',
          data: response.data,
        };
      })
      .catch(function (error) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'flight data not found',
          data: [],
        };
      });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllFlights() {
    return this.flightService.getAllFlights();
  }

  @Get('/get/:email')
  @UseGuards(AuthGuard('jwt'))
  getFlightByUemail(@Param('email') email: any) {
    return this.flightService.getFlightsByUemail(email);
  }

  @Get('/data/:flightNum')
  @UseGuards(AuthGuard('jwt'))
  getFlightByFlightNum(@Param('flightNum') flightNum: any) {
    return this.flightService.getFlightsByFlighNum(flightNum);
  }

  @Get('/share/:shareId')
  @UseGuards(AuthGuard('jwt'))
  getSharedFlight(@Param('shareId') shareId: any) {
    return this.flightService.getSharedFlight(shareId);
  }

  @Post('/save')
  @UseGuards(AuthGuard('jwt'))
  saveFlight(@Body() saveFlightDto: SaveFlightDTO) {
    return this.flightService.saveFlight(saveFlightDto);
  }

  @Delete('/delete/:shareId')
  @UseGuards(AuthGuard('jwt'))
  deleteFlight(@Param('shareId') shareId) {
    return this.flightService.deleteFlight(shareId);
  }
}
