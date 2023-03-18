import { IsNotEmpty } from 'class-validator';

export class PlaceDTO {
  nearLoactionType?: string;
  @IsNotEmpty()
  boundSW: JSON;
  @IsNotEmpty()
  boundNE: JSON;
}
