import { Request, Response } from 'express';
import { main_scale_Repository } from '../repositories/main_scale_Repository';
import { model_scale_duty_Repository } from '../repositories/model_scale_DutyRepository';
export class MainScaleController {
  async create(req: Request, res: Response) {
    const { total_of_scale_days, model_scale_id } = req.body;

    if (total_of_scale_days === undefined) {
      return res.status(400).json({ message: 'O total de dias da escala principal é obrigatório' });
    }

    // para amanha: crie plantões da escala principal e consuma - os no frontend.e depois disso crie a funcionalidade de criar e scala principal, passando como parametro a escala ModelScaleController.
    if (model_scale_id != undefined) {
      const modelScaleDuties = await model_scale_duty_Repository.find({ relations: ['scale', 'user', 'shift'] });
    }

    try {

      const newMainScale = main_scale_Repository.create({ total_of_scale_days });
      await main_scale_Repository.save(newMainScale);

      return res.status(201).json(newMainScale);
    } catch (error) {
      console.log(error);
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



  } async getAll(req: Request, res: Response) {
    try {
      const mainScales = await main_scale_Repository.find();
      return res.status(200).json(mainScales);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const mainScaleId = parseInt(id, 10);
    if (isNaN(mainScaleId)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    try {
      const mainScale = await main_scale_Repository.findOneBy({ id: mainScaleId });
      if (!mainScale) {
        return res.status(404).json({ message: 'Escala não encontrada' });
      }

      return res.status(200).json(mainScale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}