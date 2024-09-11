import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("configuration")
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bool')
  should_cordinator_aprove_duties: boolean;

}