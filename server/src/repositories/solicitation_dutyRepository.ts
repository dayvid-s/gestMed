import { AppDataSource } from '../data-source'
import { SolicitationOfDuty } from '../entities/SolicitationOfDuty'
export const SolicitationOfDutyRepository = AppDataSource.getRepository(SolicitationOfDuty)
