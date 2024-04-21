import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Nome da tabela
export class User {
	@PrimaryGeneratedColumn('increment') // Decorator do TypeORM que cria uma chave primária com incrementação
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'varchar', length: 255, unique: true })
	email: string

	@Column({ type: 'varchar', length: 255 })
	password: string
	
	
	@Column({ type: 'varchar', length: 255 })
	especialization: string
	
	@Column({ type: 'varchar', length: 255 })
	role: string
}
