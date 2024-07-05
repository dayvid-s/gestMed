import { AppDataSource } from '../data-source'
import { doctor_duty } from '../entities/Doctor_duty'
export const doctor_dutyRepository = AppDataSource.getRepository(doctor_duty)
