import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from 'typeorm';
import { Main_scale_duty } from './Main_Scale_Duty';
import { User } from './User';

const dateTransformer: ValueTransformer = {
  to: (value: Date) => value,
  from: (value: Date) => {
    const datePart = value.toISOString().split('T')[0];
    const timePart = value.toISOString().split('T')[1].split('.')[0];
    return `${datePart} ${timePart}`;
  },
};

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string; // 'read', 'unread', etc.

  @Column({ type: 'varchar', length: 50, nullable: true })
  priority: string; // 'low', 'medium', 'high', etc.

  @Column({ type: 'int', nullable: true })
  referenceId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  referenceType: string;

  @ManyToOne(() => Main_scale_duty, { nullable: true })
  duty: Main_scale_duty;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'timestamp', nullable: true })
  viewed_at: Date;

  @CreateDateColumn({ transformer: dateTransformer })
  created_at: string;

  @UpdateDateColumn({ transformer: dateTransformer })
  updated_at: string;
}