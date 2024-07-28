import { Request, Response } from 'express';
import { model_scaleRepository } from '../repositories/model_scaleRepository';
import { model_scale_duty_Repository } from '../repositories/model_scale_DutyRepository';

export class ModelScaleController {
  async create(req: Request, res: Response) {
    const { name, total_of_scale_days, is_auto_filled } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O nome da escala modelo é obrigatório' });
    }

    if (!total_of_scale_days) {
      return res.status(400).json({ message: 'O total de dias da escala modelo é obrigatório' });
    }

    const autoFilled = is_auto_filled ?? false;

    try {
      const existingModelScale = await model_scaleRepository.findOneBy({ name });
      if (existingModelScale) {
        return res.status(400).json({ message: 'Uma escala com esse nome já existe' });
      }

      const newsModelScale = model_scaleRepository.create({ name, total_of_scale_days, is_auto_filled: autoFilled });
      await model_scaleRepository.save(newsModelScale);

      return res.status(201).json(newsModelScale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, total_of_scale_days, is_auto_filled } = req.body;

    try {
      const scale = await model_scaleRepository.findOneBy({ id: parseInt(id) });

      if (!scale) {
        return res.status(404).json({ message: 'Escala não encontrada' });
      }

      scale.name = name ?? scale.name;
      scale.total_of_scale_days = total_of_scale_days ?? scale.total_of_scale_days;
      scale.is_auto_filled = is_auto_filled ?? scale.is_auto_filled;

      await model_scaleRepository.save(scale);

      return res.status(200).json(scale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const scale = await model_scaleRepository.findOneBy({ id: parseInt(id) });

      if (!scale) {
        return res.status(404).json({ message: 'Escala não encontrada' });
      }

      const duties = await model_scale_duty_Repository.find({ where: { id: scale.id } });

      if (duties.length > 0) {
        await model_scale_duty_Repository.remove(duties);
      }

      await model_scaleRepository.remove(scale);


      return res.status(200).json({ message: 'Escala modelo removida com sucesso' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const scales = await model_scaleRepository.find();
      return res.status(200).json(scales);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    try {
      const scale = await model_scaleRepository.findOneBy({ id: parsedId });

      if (!scale) {
        return res.status(404).json({ message: 'Escala não encontrada' });
      }

      return res.status(200).json(scale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
