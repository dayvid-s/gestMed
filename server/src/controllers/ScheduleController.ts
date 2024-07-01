import { Request, Response } from 'express'
import { scheduleRepository } from '../repositories/scheduleRepository'

export class ScheduleController {
    async create(req: Request, res: Response) {
        const { name, total_of_schedule_days, is_auto_filled } = req.body
        if (!name) {
            return res.status(400).json({ message: 'O nome da escala é obrigatório' })
        }

        if (!total_of_schedule_days) {
            return res.status(400).json({ message: 'O total de dias da escala é obrigatório' })
        }

        const autoFilled = is_auto_filled ?? false;

        try {
            const existingSchedule = await scheduleRepository.findOneBy({ name });
            if (existingSchedule) {
                return res.status(400).json({ message: 'Uma escala com esse nome já existe' });
            }

            const newSchedule = scheduleRepository.create({ name, total_of_schedule_days, is_auto_filled: autoFilled })
            await scheduleRepository.save(newSchedule)

            return res.status(201).json(newSchedule)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const schedule = await scheduleRepository.findOneBy({ id: parseInt(id) });

            if (!schedule) {
                return res.status(404).json({ message: 'Escala não encontrada' });
            }

            await scheduleRepository.remove(schedule);

            return res.status(200).json({ message: 'Escala removida com sucesso' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    
    
    
    async getAll(req: Request, res: Response) {
        try {
            const schedules = await scheduleRepository.find();
            return res.status(200).json(schedules);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
