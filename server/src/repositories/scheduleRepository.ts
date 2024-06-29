import { AppDataSource } from '../data-source'
import { Schedule} from '../entities/Schedule'
export const scheduleRepository = AppDataSource.getRepository(Schedule)
