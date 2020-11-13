import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDateAvailabilityService from '@modules/appointments/services/ListProviderDateAvailabilityService';

export default class ProviderDateAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { date, month, year } = request.query;

    const listProviderDateAvailability = container.resolve(
      ListProviderDateAvailabilityService,
    );

    const availability = await listProviderDateAvailability.execute({
      provider_id,
      date: Number(date),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
