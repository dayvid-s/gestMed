import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { ScheduleController } from './controllers/ScheduleController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)


routes.post('/schedule', authMiddleware, new ScheduleController().create)

routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile)

export default routes
