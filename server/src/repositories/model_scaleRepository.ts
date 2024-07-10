import { AppDataSource } from '../data-source'
import { Model_scale } from '../entities/Model_Scale'
export const model_scaleRepository = AppDataSource.getRepository(Model_scale)
