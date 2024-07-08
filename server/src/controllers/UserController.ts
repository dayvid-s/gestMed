import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { roles, genders, UserData } from '../@types/user';
import { shiftRepository } from '../repositories/shiftRepository';

export class UserController {
	async create(req: Request, res: Response) {
		const {
			name, email, password, specialization, role, crm, uf, city, phone, cpf, rg, address, bank, agency, account, gender, shift,
		} = req.body;

		const userExists = await userRepository.findOneBy({ email });

		const validRoles: roles[] = ['Básico', 'Coordenador', 'Master', 'Médico'];
		const validGenders: genders[] = ['Masculino', 'Feminino', ''];

		if (!name || !email || !password || !role) {
			throw new BadRequestError('Faltam campos na requisição. Certifique-se de fornecer os campos: name, email, password e role.');
		}

		if (!validRoles.includes(role)) {
			throw new BadRequestError('Role inválido. Os valores válidos são: ' + validRoles.join(', '));
		}

		if (role === 'Médico') {
			const requiredFields = ['crm', 'uf', 'city', 'phone', 'cpf', 'rg', 'address', 'bank', 'agency', 'account', 'gender'];
			const missingFields: string[] = [];

			requiredFields.forEach(field => {
				if (!req.body[field]) {
					missingFields.push(field);
				}
			});

			if (missingFields.length > 0) {
				throw new BadRequestError(`Faltam campos na requisição para o cargo / função de "Médico".Certifique-se de fornecer todos os campos obrigatórios: ${missingFields.join(', ')}.`);
			}

			if (!validGenders.includes(gender)) {
				throw new BadRequestError('Gênero inválido. Os valores válidos são: ' + validGenders.join(', '));
			}

			if (!shift) {
				throw new BadRequestError('Turno é obrigatório para médicos.');
			}
		}

		if (userExists) {
			throw new BadRequestError('Usuário já possui login');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = userRepository.create({
			name,
			email,
			password: hashPassword,
			specialization: specialization ?? '',
			role,
			crm,
			uf,
			city,
			phone,
			cpf,
			rg,
			address,
			bank,
			agency,
			account,
			gender,
			shift,
		});

		await userRepository.save(newUser);

		const { password: _, ...user } = newUser;

		return res.status(201).json(user);
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const users = await userRepository.find();
			return res.json(users);
		} catch (error) {
			return res.status(500).json({ error: "Failed to fetch users" });
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await userRepository.findOneBy({ email });

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos');
		}

		const verifyPass = await bcrypt.compare(password, user.password);

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		});

		const { password: _, ...userLogin } = user;

		return res.json({
			user: userLogin,
			token: token,
		});
	}

	async getProfile(req: Request, res: Response) {
		return res.json(req.user);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const user = await userRepository.findOneBy({ id: parseInt(id) });

			if (!user) {
				throw new NotFoundError('Usuário não encontrado');
			}

			await userRepository.remove(user);

			return res.status(200).json({ message: 'Usuário removido com sucesso' });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Erro interno do servidor' });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const {
			name, email, password, specialization, role, crm, uf, city, phone, cpf, rg, address, bank, agency, account, gender, shift,
		} = req.body;

		const validRoles: roles[] = ['Básico', 'Coordenador', 'Master', 'Médico'];
		const validGenders: genders[] = ['Masculino', 'Feminino', ''];

		try {
			const user = await userRepository.findOneBy({ id: parseInt(id) });

			if (!user) {
				throw new NotFoundError('Usuário não encontrado');
			}

			if (email && email !== user.email) {
				const emailExists = await userRepository.findOneBy({ email });
				if (emailExists) {
					throw new BadRequestError('E-mail já está em uso');
				}
				user.email = email;
			}

			if (name) user.name = name;
			if (specialization) user.specialization = specialization;
			if (role) {
				if (!validRoles.includes(role)) {
					throw new BadRequestError('Role inválido. Os valores válidos são: ' + validRoles.join(', '));
				}
				user.role = role;
			}
			if (password) user.password = await bcrypt.hash(password, 10);

			if (role === 'Médico') {
				const requiredFields = ['crm', 'uf', 'city', 'phone', 'cpf', 'rg', 'address', 'bank', 'agency', 'account', 'gender'];
				const missingFields: string[] = [];

				requiredFields.forEach(field => {
					if (!req.body[field]) {
						missingFields.push(field);
					}
				});

				if (missingFields.length > 0) {
					throw new BadRequestError(`Faltam campos na requisição para o cargo / função de "Médico".Certifique - se de fornecer todos os campos obrigatórios: ${missingFields.join(', ')}.`);
				}

				if (!validGenders.includes(gender)) {
					throw new BadRequestError('Gênero inválido. Os valores válidos são: ' + validGenders.join(', '));
				}

				user.crm = crm ?? user.crm;
				user.uf = uf ?? user.uf;
				user.city = city ?? user.city;
				user.phone = phone ?? user.phone;
				user.cpf = cpf ?? user.cpf;
				user.rg = rg ?? user.rg;
				user.address = address ?? user.address;
				user.bank = bank ?? user.bank;
				user.agency = agency ?? user.agency;
				user.account = account ?? user.account;
				user.gender = gender ?? user.gender;
				user.shift = shift ?? user.shift;
			}

			await userRepository.save(user);

			const { password: _, ...updatedUser } = user;

			return res.status(200).json(updatedUser);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Erro interno do servidor' });
		}
	}
}