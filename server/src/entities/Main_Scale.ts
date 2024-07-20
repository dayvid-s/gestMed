import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("main_scale")
export class Main_scale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  total_of_scale_days: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

