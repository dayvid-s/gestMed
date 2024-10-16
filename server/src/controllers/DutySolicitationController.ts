import { Request, Response } from 'express';
import { Main_scale_duty } from '../entities/Main_Scale_Duty';
import { User } from '../entities/User';
import { NotFoundError } from '../helpers/api-errors';
import { configuration_Repository } from '../repositories/configuration_Repository';
import { DutySolicitationRepository } from '../repositories/duty_solicitation_Repository';
import { main_scale_duty_Repository } from '../repositories/main_scale_duty_Repository';
import { main_scale_Repository } from '../repositories/main_scale_Repository';
import { shiftRepository } from '../repositories/shiftRepository';

interface InfoForNewDuty {
  shift: number;
  scale_date: string;
}


interface getAllFromOneUserRequestBody {
  user: {
    id: number;
  };
}

export class SolicitationOfDutyController {
  async createSolicitationOfNoExistentDuty(req: Request, res: Response) {
    let { user, infoForNewDuty }: { user: User, infoForNewDuty: InfoForNewDuty } = req.body;
    console.log(infoForNewDuty)

    const scale = await main_scale_Repository.findOneBy({ id: 1 });
    const shift = await shiftRepository.findOneBy({ id: infoForNewDuty.shift });
    const config = await configuration_Repository.findOneBy({ id: 1 });

    if (!scale || !shift) {
      throw new NotFoundError('Escala não encontrada');
    }

    if (!config) {
      throw new NotFoundError('Configuração não encontrada.');
    }

    if (config.should_cordinator_aprove_duties === false) {
      const newDuty = main_scale_duty_Repository.create({
        scale,
        user: user,
        shift: shift,
        scale_date: infoForNewDuty.scale_date,
      });

      try {
        const duty = await main_scale_duty_Repository.save(newDuty);
        console.log("Novo plantão criado:", duty);
      } catch (error) {
        console.error("Erro ao criar plantão:", error);
      }

      const newSolicitation = DutySolicitationRepository.create({
        status: "approved",
        message: "Sua solicitação foi aprovada automaticamente por conta da configuração da escala.",
        // @ts-expect-errorsad
        shift: infoForNewDuty.shift,
        scale_date: infoForNewDuty.scale_date,
        user,
      });

      await DutySolicitationRepository.save(newSolicitation);
      return res.status(201).json(newSolicitation);

    }

    const newSolicitation = DutySolicitationRepository.create({
      status: "in progress",
      message: "Solicitação feita! Agora é só esperar o coodernador aprovar para você ser inserido no plantão.",
      scale_date: infoForNewDuty.scale_date,
      // @ts-expect-errorasd
      shift: infoForNewDuty.shift,
      user,
    });

    await DutySolicitationRepository.save(newSolicitation);
    return res.status(201).json(newSolicitation);
  }

  async createSolicitationOfExistentDuty(req: Request, res: Response) {
    let { existentDuty, user }: { existentDuty: Main_scale_duty, user: User } = req.body;

    const config = await configuration_Repository.findOneBy({ id: 1 });

    if (!config) {
      throw new NotFoundError('Configuração não encontrada.');
    }

    if (config.should_cordinator_aprove_duties === false) {
      const newDuty = {
        scale_id: 1,
        user_id: user.id,
        shift_id: existentDuty.shift.id,
        scale_date: existentDuty.scale_date,
      };

      const duty = await main_scale_duty_Repository.save(newDuty);
      console.log("Novo plantão criado:", duty);

      const newSolicitation = DutySolicitationRepository.create({
        status: "approved",
        message: "Sua solicitação foi aprovada automaticamente por conta da configuração da escala.",
        existentDuty: existentDuty,
        user,
      });

      await DutySolicitationRepository.save(newSolicitation);
      return res.status(201).json(newSolicitation);

    }

    const newSolicitation = DutySolicitationRepository.create({
      status: "in progress",
      message: "Solicitação feita! Agora é só esperar o coodernador aprovar para você ser inserido no plantão.",
      existentDuty: existentDuty,
      user,
    });

    await DutySolicitationRepository.save(newSolicitation);
    return res.status(201).json(newSolicitation);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const solicitations = await DutySolicitationRepository.find({ relations: ['existentDuty', 'user'] });
    return res.json(solicitations);
  }


  async getAllFromOneUser(
    req: Request<{}, {}, getAllFromOneUserRequestBody>,
    res: Response
  ): Promise<Response> {
    const { user } = req.body;

    if (!user || !user.id) {
      return res.status(400).json({ message: "Usuário inválido." });
    }

    const solicitations = await DutySolicitationRepository.find({
      where: { user: { id: user.id } },
      relations: ['existentDuty', 'user', 'shift'],
    });

    return res.json(solicitations);
  }


  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const solicitation = await DutySolicitationRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['existentDuty', 'userId'],
    });
    if (!solicitation) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    return res.json(solicitation);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, duty, user } = req.body;

    const solicitation = await DutySolicitationRepository.findOneBy({ id: parseInt(id, 10) });

    if (!solicitation) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    solicitation.status = status;
    solicitation.user = user;

    await DutySolicitationRepository.save(solicitation);

    return res.json(solicitation);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const solicitation = await DutySolicitationRepository.findOneBy({ id: parseInt(id, 10) });

    if (!solicitation) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    await DutySolicitationRepository.remove(solicitation);

    return res.status(204).send();
  }
}