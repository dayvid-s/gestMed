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
}
