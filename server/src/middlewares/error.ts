import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-errors';

// Middleware de erro para capturar e retornar erros JSON
export const errorMiddleware = (
	error: Error & Partial<ApiError>,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';

	// Log do erro
	console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${message}`);
	console.error(error.stack);

	return res.status(statusCode).json({ message });
};
