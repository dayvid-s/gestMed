import { AppDataSource } from '../data-source'
import { Scale_insertions } from '../entities/Scale_insertion'
export const scale_insertionsRepository = AppDataSource.getRepository(Scale_insertions)
