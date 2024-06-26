import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Shift } from './Shift';
import { Schedule } from './Schedule';

@Entity("scale_insertion")
export class Scale_insertions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Schedule, schedule => schedule.id)
    schedule: Schedule;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne(() => Shift, shift => shift.id)
    shift: Shift;

    @Column('date')
    schedule_date: string;

    @CreateDateColumn()
    created_at: Date;
}

