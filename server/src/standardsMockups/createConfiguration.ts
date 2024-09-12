import { Configuration } from '../entities/Configuration';
import { configuration_Repository } from '../repositories/configuration_Repository';

export function createDefaultConfigurations(): Configuration[] {
  const defaultConfig1 = new Configuration();
  defaultConfig1.id = 1;
  defaultConfig1.should_cordinator_aprove_duties = true;

  return [defaultConfig1];
}

export async function initializeDefaultConfigurations() {
  const defaultConfigurations = createDefaultConfigurations();
  for (const config of defaultConfigurations) {
    const existingConfig = await configuration_Repository.findOne({ where: { id: config.id } });
    if (!existingConfig) {
      await configuration_Repository.save(config);
    }
  }
}