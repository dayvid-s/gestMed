import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Model_scale } from './Model_Scale';
import { Shift } from './Shift';
import { User } from './User';

@Entity("model_scale_duty")
export class Model_scale_duty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Model_scale, model_scale => model_scale.id)
  scale: Model_scale;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Shift, shift => shift.id)
  shift: Shift;

  @Column('int')
  scale_date: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

