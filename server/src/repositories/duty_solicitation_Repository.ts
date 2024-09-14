import { AppDataSource } from '../data-source'
import { DutySolicitation } from '../entities/Duty_Solicitation'
export const DutySolicitationRepository = AppDataSource.getRepository(DutySolicitation)
