import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id: request.user.id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { email, name, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      email,
      name,
      old_password,
      password,
      user_id: request.user.id,
    });

    return response.json(user);
  }
}
