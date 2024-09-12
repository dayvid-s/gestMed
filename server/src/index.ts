import cors from 'cors';
import express, { Router } from 'express';
import 'express-async-errors';
import ModelScaleDutyRoute from './routes/ModelScaleDutyRoute';
import ModelScaleRoute from './routes/ModelScaleRoute';
import SolicitationOfDutyRoute from './routes/SolicitationOfDutyRoute';
import UserRoute from './routes/UserRoute';


import { AppDataSource } from './data-source';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorMiddleware } from './middlewares/error';
import { shiftRepository } from './repositories/shiftRepository';
import ConfigurationRoute from './routes/ConfigurationRoute';
import MainScaleDutyRoute from './routes/MainScaleDutyRoute';
import MainScaleRoute from './routes/MainScaleRoute';
import ShiftRoute from './routes/ShiftRoute';

import { initializeDefaultConfigurations } from './standardsMockups/createConfiguration';
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
  app.use(MainScaleRoute)
  app.use(MainScaleDutyRoute)
  app.use(ModelScaleDutyRoute)
  app.use(SolicitationOfDutyRoute)
  app.use(ConfigurationRoute)

  app.use(errorMiddleware)


  const defaultShifts = createDefaultShifts();
  for (const shift of defaultShifts) {
    const existingShift = await shiftRepository.findOne({ where: { name: shift.name } });
    if (!existingShift) {
      await shiftRepository.save(shift);
    }
  }


  initializeDefaultConfigurations()
  console.log('Servidor ativo na porta ', process.env.PORT)
  return app.listen(process.env.PORT)
})
