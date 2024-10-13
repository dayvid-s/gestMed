import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';
import { SolicitationOfDutyType } from '../@types/SolicitationOfDutyTypes';
import { Main_scale_duty } from './Main_Scale_Duty';
import { Shift } from './Shift';
import { User } from './User';

const dateTransformer: ValueTransformer = {
  to: (value: Date) => value,
  from: (value: Date) => {
    const datePart = value.toISOString().split('T')[0];
    const timePart = value.toISOString().split('T')[1].split('.')[0];
    return `${datePart} ${timePart}`;
  },
};

@Entity('duty_solicitation')
export class DutySolicitation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: ['in progress', 'rejected', 'approved'] })
  status: SolicitationOfDutyType;


  @ManyToOne(() => Main_scale_duty, { nullable: true })
  existentDuty: Main_scale_duty | null;

  @Column({ type: 'varchar', length: 900, nullable: true })
  message: string;


  @ManyToOne(() => Shift, shift => shift.id, { nullable: true })
  shift: Shift | null;

  @Column('date', { nullable: true })
  scale_date: string | null;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ transformer: dateTransformer })
  created_at: string;

  @UpdateDateColumn({ transformer: dateTransformer })
  updated_at: string;
}