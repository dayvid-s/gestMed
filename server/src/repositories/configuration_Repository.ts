import { AppDataSource } from '../data-source';
import { Configuration } from '../entities/Configuration';

export const configuration_Repository = AppDataSource.getRepository(Configuration);
