import { Request, Response } from 'express';
import { main_scale_Repository } from '../repositories/main_scale_Repository';
import { model_scale_duty_Repository } from '../repositories/model_scale_DutyRepository';
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
  async copyDutiesFromTheModelScale(req: Request, res: Response) {
    try {
      const { model_scale_id } = req.params;

      if (!model_scale_id) {
        return res.status(400).json({ message: 'O ID da escala modelo é obrigatório' });
      }

      const scaleId = parseInt(model_scale_id, 10);
      if (isNaN(scaleId)) {
        return res.status(400).json({ message: 'O ID da escala modelo deve ser um número válido' });
      }

      const modelScaleDuties = await model_scale_duty_Repository.find({
        where: { scale: { id: scaleId } },
        relations: ['scale', 'user', 'shift'],
      });

      // Lógica para manipular os dados obtidos
      // e, possivelmente, copiar os plantões para uma nova escala.

      return res.status(200).json(modelScaleDuties);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}