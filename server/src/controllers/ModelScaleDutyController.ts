import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';


import { model_scale_duty_Repository } from '../repositories/model_scale_DutyRepository';

import { model_scaleRepository } from '../repositories/model_scaleRepository';
import { shiftRepository } from '../repositories/shiftRepository';
import { userRepository } from '../repositories/userRepository';

export class ModelScaleDutyController {
  async create(req: Request, res: Response) {
    const { scale_id, user_id, shift_id, scale_date } = req.body;

    if (!scale_id || !user_id || !shift_id || !scale_date) {
      throw new BadRequestError('Faltam campos na requisição. Certifique-se de fornecer todos os campos obrigatórios.');
    }

    const scale = await model_scaleRepository.findOneBy({ id: scale_id });
    const user = await userRepository.findOneBy({ id: user_id });
    const shift = await shiftRepository.findOneBy({ id: shift_id });

    if (!scale) throw new NotFoundError('Escala modelo não encontrada.');
    if (!user) throw new NotFoundError('Usuário não encontrado.');
    if (!shift) throw new NotFoundError('Turno não encontrado.');

    const newModelScaleDuty = model_scale_duty_Repository.create({
      scale,
      user,
      shift,
      scale_date,
    });

    await model_scale_duty_Repository.save(newModelScaleDuty);

    return res.status(201).json(newModelScaleDuty);
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
      const scale = await model_scaleRepository.findOneBy({ id: scale_id });
      const user = await userRepository.findOneBy({ id: user_id });
      const shift = await shiftRepository.findOneBy({ id: shift_id });

      if (!scale) throw new NotFoundError('Escala modelo não encontrada.');
      if (!user) throw new NotFoundError('Usuário não encontrado.');
      if (!shift) throw new NotFoundError('Turno não encontrado.');

      const newDuty = model_scale_duty_Repository.create({
        scale,
        user,
        shift,
        scale_date,
      });

      const savedDuty = await model_scale_duty_Repository.save(newDuty);
      createdDuties.push(savedDuty);
    }

    return res.status(201).json(createdDuties);
  }


  async getAll(req: Request, res: Response) {
    const modelScaleDuties = await model_scale_duty_Repository.find({ relations: ['scale', 'user', 'shift'] });
    return res.status(200).json(modelScaleDuties);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const modelScaleDuty = await model_scale_duty_Repository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['scale', 'user', 'shift'],
    });

    if (!modelScaleDuty) throw new NotFoundError('Plantão de escala modelo não encontrado.');

    return res.status(200).json(modelScaleDuty);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { scale_id, user_id, shift_id, scale_date } = req.body;

    const modelScaleDuty = await model_scale_duty_Repository.findOneBy({ id: parseInt(id, 10) });

    if (!modelScaleDuty) throw new NotFoundError('Plantão de escala modelo não encontrado.');

    const scale = await model_scaleRepository.findOneBy({ id: scale_id });
    const user = await userRepository.findOneBy({ id: user_id });
    const shift = await shiftRepository.findOneBy({ id: shift_id });

    if (!scale) throw new NotFoundError('Escala modelo não encontrada.');
    if (!user) throw new NotFoundError('Usuário não encontrado.');
    if (!shift) throw new NotFoundError('Turno não encontrado.');

    modelScaleDuty.scale = scale;
    modelScaleDuty.user = user;
    modelScaleDuty.shift = shift;
    modelScaleDuty.scale_date = scale_date;

    await model_scale_duty_Repository.save(modelScaleDuty);

    return res.status(200).json(modelScaleDuty);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const modelScaleDuty = await model_scale_duty_Repository.findOneBy({ id: parseInt(id, 10) });

    if (!modelScaleDuty) throw new NotFoundError('Plantão de escala modelo não encontrado.');

    await model_scale_duty_Repository.remove(modelScaleDuty);

    return res.status(200).json({ message: 'Plantão de escala modelo deletado com sucesso.' });
  }
}
