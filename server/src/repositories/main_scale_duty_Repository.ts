
import { AppDataSource } from '../data-source';
import { Main_scale_duty } from '../entities/Main_Scale_Duty';

export const main_scale_duty_Repository = AppDataSource.getRepository(Main_scale_duty);
