import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {  roles } from '../@types/user'

export class UserController {
	async create(req: Request, res: Response) {
		const { name, email, password, specialization, role } = req.body;

		const userExists = await userRepository.findOneBy({ email });

		const validRoles: roles[] = ['Básico', 'Coordernador', 'Master', 'Médico'];

		if (!name || !email || !password || !role) {
			throw new BadRequestError('Faltam campos na requisição. Certifique-se de fornecer os campos: name, email, password e role.');
		}

		if (!validRoles.includes(role)) {
			throw new BadRequestError('Role inválido. Os valores válidos são: ' + validRoles.join(', '));
		}

		if (userExists) {
			throw new BadRequestError('Usuário já possui login');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = userRepository.create({
			name,
			email,
			password: hashPassword,
			specialization: specialization ?? 'null', 
			role
		});

		await userRepository.save(newUser);

		const { password: _, ...user } = newUser;

		return res.status(201).json(user);
	}


	async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await userRepository.findOneBy({ email })

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		const { password: _, ...userLogin } = user

		return res.json({
			user: userLogin,
			token: token,
		})
	}

	async getProfile(req: Request, res: Response) {
		return res.json(req.user)
	}
}
