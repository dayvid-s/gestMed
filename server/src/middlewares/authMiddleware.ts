import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

type JwtPayload = {
	id: number;
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Não autorizado' });
	}

	const token = authorization.split(' ')[1];

	try {
		const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

		const user = await userRepository.findOneBy({ id });

		if (!user) {
			return res.status(401).json({ message: 'Não autorizado' });
		}

		const { password: _, ...loggedUser } = user;
		req.user = loggedUser;

		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: 'Token inválido' });
		}

		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};
