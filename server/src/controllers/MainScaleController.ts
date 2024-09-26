import { Request, Response } from 'express';
import { DutySolicitationRepository } from '../repositories/duty_solicitation_Repository';
import { main_scale_duty_Repository } from '../repositories/main_scale_duty_Repository';
import { main_scale_Repository } from '../repositories/main_scale_Repository';
import { model_scale_duty_Repository } from '../repositories/model_scale_DutyRepository';
import { model_scaleRepository } from '../repositories/model_scaleRepository';
export class MainScaleController {
  async create(req: Request, res: Response) {
    const { total_of_scale_days, model_scale_id } = req.body;

    if (total_of_scale_days === undefined) {
      return res.status(400).json({ message: 'O total de dias da escala principal é obrigatório' });
    }

    try {
      const existingMainScale = await main_scale_Repository.find();
      if (existingMainScale) {
        return res.status(400).json({ message: 'Já existe uma escala principal. Só é permitida uma escala principal.' });
      }

      const newMainScale = main_scale_Repository.create({ total_of_scale_days });
      await main_scale_Repository.save(newMainScale);

      return res.status(201).json(newMainScale);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { total_of_scale_days } = req.body;

    const mainScaleId = parseInt(id, 10);
    if (isNaN(mainScaleId)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    try {
      const mainScale = await main_scale_Repository.findOneBy({ id: mainScaleId });
      if (!mainScale) {
        return res.status(404).json({ message: 'Escala não encontrada' });
      }

      mainScale.total_of_scale_days = total_of_scale_days ?? mainScale.total_of_scale_days;
      await main_scale_Repository.save(mainScale);

      return res.status(200).json(mainScale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }


  async getAll(req: Request, res: Response) {
    try {
      const mainScales = await main_scale_Repository.find();
      return res.status(200).json(mainScales);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
  async transformModelScaleIntoMainScale(req: Request, res: Response) {
    try {
      const { model_scale_id } = req.params;

      if (!model_scale_id) {
        return res.status(400).json({ message: 'O ID da escala modelo é obrigatório' });
      }

      const scaleId = parseInt(model_scale_id, 10);
      if (isNaN(scaleId)) {
        return res.status(400).json({ message: 'O ID da escala modelo deve ser um número válido' });
      }

      const modelScaleInfo = await model_scaleRepository.findOneBy({ id: scaleId });
      if (!modelScaleInfo) {
        return res.status(404).json({ message: 'Escala modelo não encontrada' });
      }

      const updatedMainScale = {
        id: 1,
        total_of_scale_days: modelScaleInfo.total_of_scale_days
      };

      await main_scale_Repository.save(updatedMainScale);


      await DutySolicitationRepository.createQueryBuilder()
        .delete()
        .where('existentDutyId IN (SELECT id FROM main_scale_duty WHERE scaleId = :scaleId)', { scaleId: 1 })
        .execute();

      await main_scale_duty_Repository.createQueryBuilder()
        .delete()
        .where('scaleId = :scaleId', { scaleId: 1 })
        .execute();

      const modelScaleDuties = await model_scale_duty_Repository.find({
        where: { scale: { id: scaleId } },
        relations: ['scale', 'user', 'shift'],
      });

      for (let modelScaleDuty of modelScaleDuties) {
        const newDuty = main_scale_duty_Repository.create({
          scale: { id: 1 },
          user: modelScaleDuty.user ? { id: modelScaleDuty.user.id } : null,
          shift: { id: modelScaleDuty.shift.id },
          scale_date: modelScaleDuty.scale_date,
        });
        await main_scale_duty_Repository.save(newDuty);
      }

      return res.status(200).json({ message: 'Escala modelo transformada em escala principal com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}