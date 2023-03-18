import { PlaceController } from './controller/place.controller';
import { PlaceService } from './service/place.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
