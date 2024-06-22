import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("schedule")
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column('date')
    start_date: string;

    @Column('date')
    end_date: string;

    @CreateDateColumn()
    created_at: Date;
}

