import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';
import { main_scale_duty_Repository } from '../repositories/main_scale_duty_Repository';
import { main_scale_Repository } from '../repositories/main_scale_Repository';
import { shiftRepository } from '../repositories/shiftRepository';
import { userRepository } from '../repositories/userRepository';

export class MainScaleDutyController {
  async create(req: Request, res: Response) {
    const { scale_id, user_id, shift_id, scale_date } = req.body;

    if (!scale_id || !user_id || !shift_id || !scale_date) {
      throw new BadRequestError('Faltam campos na requisição. Certifique-se de fornecer todos os campos obrigatórios.');
    }

    const scale = await main_scale_Repository.findOneBy({ id: scale_id });
    const user = await userRepository.findOneBy({ id: user_id });
    const shift = await shiftRepository.findOneBy({ id: shift_id });

    if (!scale) throw new NotFoundError('Escala principal não encontrada.');
    if (!user) throw new NotFoundError('Usuário não encontrado.');
    if (!shift) throw new NotFoundError('Turno não encontrado.');

    const newMainScaleDuty = main_scale_duty_Repository.create({
      scale,
      user,
      shift,
      scale_date,
    });

    await main_scale_duty_Repository.save(newMainScaleDuty);

    return res.status(201).json(newMainScaleDuty);
  }

  async createBatch(req: Request, res: Response) {
    const duties = req.body;

    if (!Array.isArray(duties) || duties.length === 0) {
      throw new BadRequestError('Requisição deve conter um array de plantões.');
    }

    const createdDuties = [];

    for (const duty of duties) {
      const { scale_id, user_id, shift_id, scale_date } = duty;

      if (!scale_id) {
        throw new BadRequestError('Campo "scale_id" está faltando na requisição.');
      }
      if (!user_id) {
        throw new BadRequestError('Campo "user_id" está faltando na requisição.');
      }
      if (!shift_id) {
        throw new BadRequestError('Campo "shift_id" está faltando na requisição.');
      }
      if (!scale_date) {
        throw new BadRequestError('Campo "scale_date" está faltando na requisição.');
      }

      const scale = await main_scale_duty_Repository.findOneBy({ id: scale_id });
      const user = await userRepository.findOneBy({ id: user_id });
      const shift = await shiftRepository.findOneBy({ id: shift_id });

      if (!scale) throw new NotFoundError('Escala principal não encontrada.');
      if (!user) throw new NotFoundError('Usuário não encontrado.');
      if (!shift) throw new NotFoundError('Turno não encontrado.');

      const newDuty = main_scale_duty_Repository.create({
        scale,
        user,
        shift,
        scale_date,
      });

      const savedDuty = await main_scale_duty_Repository.save(newDuty);
      createdDuties.push(savedDuty);
    }

    return res.status(201).json(createdDuties);
  }

  async getAll(req: Request, res: Response) {
    const mainScaleDuties = await main_scale_duty_Repository.find({ relations: ['scale', 'user', 'shift'] });
    return res.status(200).json(mainScaleDuties);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const mainScaleDuty = await main_scale_duty_Repository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['scale', 'user', 'shift'],
    });

    if (!mainScaleDuty) throw new NotFoundError('Plantão de escala principal não encontrado.');

    return res.status(200).json(mainScaleDuty);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { scale_id, user_id, shift_id, scale_date } = req.body;

    const mainScaleDuty = await main_scale_duty_Repository.findOneBy({ id: parseInt(id, 10) });

    if (!mainScaleDuty) throw new NotFoundError('Plantão de escala principal não encontrado.');

    const scale = await main_scale_Repository.findOneBy({ id: scale_id });
    const user = await userRepository.findOneBy({ id: user_id });
    const shift = await shiftRepository.findOneBy({ id: shift_id });

    if (!scale) throw new NotFoundError('Escala principal não encontrada.');
    if (!user) throw new NotFoundError('Usuário não encontrado.');
    if (!shift) throw new NotFoundError('Turno não encontrado.');

    mainScaleDuty.scale = scale;
    mainScaleDuty.user = user;
    mainScaleDuty.shift = shift;
    mainScaleDuty.scale_date = scale_date;

    await main_scale_duty_Repository.save(mainScaleDuty);

    return res.status(200).json(mainScaleDuty);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const mainScaleDuty = await main_scale_duty_Repository.findOneBy({ id: parseInt(id, 10) });

    if (!mainScaleDuty) throw new NotFoundError('Plantão de escala principal não encontrado.');

    await main_scale_duty_Repository.remove(mainScaleDuty);

    return res.status(200).json({ message: 'Plantão de escala principal deletado com sucesso.' });
  }
}
