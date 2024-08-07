import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';
import { shiftRepository } from '../repositories/shiftRepository';

export class ShiftController {
    async create(req: Request, res: Response) {
        const { name, start_time, end_time } = req.body;

        if (!name || !start_time || !end_time) {
            throw new BadRequestError('Os campos name, start_time e end_time são obrigatórios.');
        }

        const newShift = shiftRepository.create({ name, start_time, end_time });
        await shiftRepository.save(newShift);

        return res.status(201).json(newShift);
    }

    async getAll(req: Request, res: Response) {
        const shifts = await shiftRepository.find();
        return res.status(200).json(shifts);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, start_time, end_time } = req.body;

        const shift = await shiftRepository.findOneBy({ id: parseInt(id) });

        if (!shift) {
            throw new NotFoundError('Turno não encontrado.');
        }

        shift.name = name ?? shift.name;
        shift.start_time = start_time ?? shift.start_time;
        shift.end_time = end_time ?? shift.end_time;

        await shiftRepository.save(shift);

        return res.status(200).json(shift);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const shift = await shiftRepository.findOneBy({ id: parseInt(id) });

        if (!shift) {
            throw new NotFoundError('Turno não encontrado.');
        }

        await shiftRepository.remove(shift);

        return res.status(200).json({ message: 'Turno removido com sucesso' });
    }
}