import 'express-async-errors'
import express, { Router } from 'express'
import cors from 'cors'
import UserRoute from './routes/UserRoute';
import ScheduleRoute from './routes/ScheduleRoute';

import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import { authMiddleware } from './middlewares/authMiddleware'
import ShiftRoute from './routes/ShiftRoute';
import { createDefaultShifts } from './standardsMockups/createShifts';
import { shiftRepository } from './repositories/shiftRepository';

export const routes = Router()

AppDataSource.initialize().then(async () => {
	routes.use(authMiddleware)

	const app = express()
	app.use(cors())

	app.use(express.json())


	app.use(UserRoute);
	app.use(ScheduleRoute);
	app.use(ShiftRoute);

	app.use(errorMiddleware)


	const defaultShifts = createDefaultShifts();
	for (const shift of defaultShifts) {
		const existingShift = await shiftRepository.findOne({ where: { name: shift.name } }); // Modificado para 'where'
		if (!existingShift) {
			await shiftRepository.save(shift);
		}
	}

	console.log('Servidor ativo na porta ', process.env.PORT)
	return app.listen(process.env.PORT)
})
