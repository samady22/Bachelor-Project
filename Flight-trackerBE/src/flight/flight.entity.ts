import { User } from './../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  number: string;
  @Column()
  share_id: string;
  @Column({ type: 'json' })
  aircraft: JSON;
  @Column({ type: 'json' })
  airline: JSON;
  @Column()
  status: string;
  @Column({ type: 'json' })
  greatCircleDistance: JSON;
  @Column({ type: 'json' })
  departure: JSON;
  @Column({ type: 'json' })
  arrival: JSON;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_: User;
  @Column()
  user_id: number;
}
