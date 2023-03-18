import { IsNotEmpty } from 'class-validator';

export class SaveFlightDTO {
  number: string;
  status: string;
  aircraft: JSON;
  airline: JSON;
  greatCircleDistance?: JSON;
  departure: JSON;
  arrival: JSON;
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  user: any;
  @IsNotEmpty()
  share_id: string;
}
