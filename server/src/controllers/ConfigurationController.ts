import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';
import { configuration_Repository } from '../repositories/configuration_Repository';

export class ConfigurationController {
  async create(req: Request, res: Response) {
    const { should_cordinator_aprove_duties } = req.body;

    if (should_cordinator_aprove_duties === undefined) {
      throw new BadRequestError('O campo should_cordinator_aprove_duties é obrigatório.');
    }

    const newConfig = configuration_Repository.create({ should_cordinator_aprove_duties });
    await configuration_Repository.save(newConfig);

    return res.status(201).json(newConfig);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { should_cordinator_aprove_duties } = req.body;

    const config = await configuration_Repository.findOneBy({ id: parseInt(id) });

    if (!config) {
      throw new NotFoundError('Configuração não encontrada.');
    }

    config.should_cordinator_aprove_duties = should_cordinator_aprove_duties ?? config.should_cordinator_aprove_duties;

    await configuration_Repository.save(config);

    return res.status(200).json(config);
  }

  async getById(req: Request, res: Response) {
    const config = await configuration_Repository.findOneBy({ id: 1 });

    if (!config) {
      throw new NotFoundError('Configuração não encontrada.');
    }

    return res.status(200).json(config);
  }
}
