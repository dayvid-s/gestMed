import { Request, Response } from 'express';
import { DutySolicitationRepository } from '../repositories/duty_solicitation_Repository';

export class SolicitationOfDutyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { status, duty, user } = request.body;

    const newSolicitation = DutySolicitationRepository.create({
      status,
      duty,
      user,
    });

    await DutySolicitationRepository.save(newSolicitation);

    return response.status(201).json(newSolicitation);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const solicitations = await DutySolicitationRepository.find({ relations: ['duty', 'user'] });
    return response.json(solicitations);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const solicitation = await DutySolicitationRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['duty', 'user',],
    });
    if (!solicitation) {
      return response.status(404).json({ message: 'Solicitation not found' });
    }

    return response.json(solicitation);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status, duty, user } = request.body;

    const solicitation = await DutySolicitationRepository.findOneBy({ id: parseInt(id, 10) })

    if (!solicitation) {
      return response.status(404).json({ message: 'Solicitation not found' });
    }

    solicitation.status = status;
    solicitation.duty = duty;
    solicitation.user = user;

    await DutySolicitationRepository.save(solicitation);

    return response.json(solicitation);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const solicitation = await DutySolicitationRepository.findOneBy({ id: parseInt(id, 10) });

    if (!solicitation) {
      return response.status(404).json({ message: 'Solicitation not found' });
    }

    await DutySolicitationRepository.remove(solicitation);

    return response.status(204).send();
  }
}