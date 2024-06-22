import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("shift")
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('time')
    start_time: string;

    @Column('time')
    end_time: string;

    @CreateDateColumn()
    created_at: Date;
}

