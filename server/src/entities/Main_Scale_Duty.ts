import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Main_scale } from './Main_Scale';
import { Shift } from './Shift';
import { User } from './User';

@Entity("main_scale_duty")
export class Main_scale_duty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Main_scale, main_scale => main_scale.id)
  scale: Main_scale;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  user: User | null;

  @ManyToOne(() => Shift, shift => shift.id)
  shift: Shift;

  @Column('int')
  scale_date: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}