import { PlaceService } from '../service/place.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlaceDTO } from '../dto/place.dto';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  getRestaurnat(@Body() placeDto: PlaceDTO) {
    // return { message: 'sucess...' };
    return this.placeService.getPlaces(placeDto);
  }
}
