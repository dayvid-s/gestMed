import { Request, Response } from 'express';
import { MainScaleController } from '../../controllers/MainScaleController';
import { DutySolicitationRepository } from '../../repositories/duty_solicitation_Repository';
import { main_scale_Repository } from '../../repositories/main_scale_Repository';
import { model_scale_duty_Repository } from '../../repositories/model_scale_DutyRepository';
import { model_scaleRepository } from '../../repositories/model_scaleRepository';

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { main_scale_duty_Repository } from '../../repositories/main_scale_duty_Repository';

jest.mock('../../repositories/duty_solicitation_Repository');
jest.mock('../../repositories/main_scale_duty_Repository');
jest.mock('../../repositories/main_scale_Repository');
jest.mock('../../repositories/model_scale_DutyRepository');
jest.mock('../../repositories/model_scaleRepository');

describe('MainScaleController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let controller: MainScaleController;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    controller = new MainScaleController();

    // Mocking DutySolicitationRepository
    (DutySolicitationRepository.createQueryBuilder as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    });

    // Mocking main_scale_duty_Repository
    (main_scale_duty_Repository.createQueryBuilder as jest.Mock).mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if model_scale_id is not provided', async () => {
    req.params = {};

    await controller.transformModelScaleIntoMainScale(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'O ID da escala modelo é obrigatório' });
  });

  it('should return 404 if model scale is not found', async () => {
    req.params = { model_scale_id: '1' };
    (model_scaleRepository.findOneBy as jest.Mock).mockResolvedValue(null);

    await controller.transformModelScaleIntoMainScale(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Escala modelo não encontrada' });
  });

  it('should successfully transform model scale into main scale', async () => {
    req.params = { model_scale_id: '1' };

    const mockModelScale = { id: 1, total_of_scale_days: 30 };
    (model_scaleRepository.findOneBy as jest.Mock).mockResolvedValue(mockModelScale);
    (model_scale_duty_Repository.find as jest.Mock).mockResolvedValue([]);

    await controller.transformModelScaleIntoMainScale(req as Request, res as Response);

    expect(main_scale_Repository.save).toHaveBeenCalledWith({ id: 1, total_of_scale_days: 30 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Escala modelo transformada em escala principal com sucesso' });
  });
});