import cors from 'cors';
import express, { Router } from 'express';
import 'express-async-errors';
import ModelScaleDutyRoute from './routes/ModelScaleDutyRoute';
import ModelScaleRoute from './routes/ModelScaleRoute';
import UserRoute from './routes/UserRoute';

import { AppDataSource } from './data-source';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorMiddleware } from './middlewares/error';
import { shiftRepository } from './repositories/shiftRepository';
import ShiftRoute from './routes/ShiftRoute';
import { createDefaultShifts } from './standardsMockups/createShifts';

export const routes = Router()

AppDataSource.initialize().then(async () => {
  routes.use(authMiddleware)

  const app = express()
  app.use(cors())

  app.use(express.json())


  app.use(UserRoute);
  app.use(ModelScaleRoute);
  app.use(ShiftRoute);
  app.use(ModelScaleDutyRoute)
  app.use(errorMiddleware)


  const defaultShifts = createDefaultShifts();
  for (const shift of defaultShifts) {
    const existingShift = await shiftRepository.findOne({ where: { name: shift.name } });
    if (!existingShift) {
      await shiftRepository.save(shift);
    }
  }

  console.log('Servidor ativo na porta ', process.env.PORT)
  return app.listen(process.env.PORT)
})
