import { getRepository, Repository } from 'typeorm';

import UserPasswordRecoveryToken from '@modules/users/infra/typeorm/entities/UserPasswordRecoveryToken';
import IUserPasswordRecoveryTokensRepository from '@modules/users/repositories/IUserPasswordRecoveryTokensRepository';

class UserPasswordRecoveryTokensRepository
  implements IUserPasswordRecoveryTokensRepository {
  private ormRepository: Repository<UserPasswordRecoveryToken>;

  constructor() {
    this.ormRepository = getRepository(UserPasswordRecoveryToken);
  }

  public async findByToken(
    token: string,
  ): Promise<UserPasswordRecoveryToken | undefined> {
    const userPasswordRecoveryToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userPasswordRecoveryToken;
  }
  public async generate(user_id: string): Promise<UserPasswordRecoveryToken> {
    const userPasswordRecoveryToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userPasswordRecoveryToken);

    return userPasswordRecoveryToken;
  }
}

export default UserPasswordRecoveryTokensRepository;
