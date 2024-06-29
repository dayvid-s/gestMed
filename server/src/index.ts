import 'express-async-errors'
import express, { Router } from 'express'
import cors from 'cors' 
import UserRoute from './routes/UserRoute';
import ScheduleRoute from './routes/ScheduleRoute';

import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import { authMiddleware } from './middlewares/authMiddleware'

export const routes = Router()

AppDataSource.initialize().then(() => { 
	routes.use(authMiddleware)

	const app = express()
	app.use(cors()) 

	app.use(express.json())

	
	app.use( UserRoute);
	app.use(ScheduleRoute);

	app.use(routes)

	app.use(errorMiddleware)
	console.log('Servidor ativo na porta ', process.env.PORT)
	return app.listen(process.env.PORT)
})
