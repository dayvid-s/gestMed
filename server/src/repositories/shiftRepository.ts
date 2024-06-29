import { AppDataSource } from '../data-source'
import { Shift} from '../entities/Shift'
export const shiftRepository = AppDataSource.getRepository(Shift)
