import { AppDataSource } from '../data-source'
import { Main_scale } from '../entities/Main_Scale'
export const main_scaleRepository = AppDataSource.getRepository(Main_scale)
