import 'express-async-errors'
import express from 'express'
import cors from 'cors' 

import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'
AppDataSource.initialize().then(() => { 
	const app = express()
	app.use(cors()) 

	app.use(express.json())

	app.use(routes)

	app.use(errorMiddleware)
	console.log('Servidor ativo na porta ', process.env.PORT)
	return app.listen(process.env.PORT)
})
