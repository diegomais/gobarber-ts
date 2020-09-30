import { uuid } from 'uuidv4';
import UserPasswordRecoveryToken from '@modules/users/infra/typeorm/entities/UserPasswordRecoveryToken';
import IUserPasswordRecoveryTokensRepository from '@modules/users/repositories/IUserPasswordRecoveryTokensRepository';

class FakeUserPasswordRecoveryTokensRepository
  implements IUserPasswordRecoveryTokensRepository {
  private userPasswordRecoveryTokens: UserPasswordRecoveryToken[] = [];

  public async findByToken(
    token: string,
  ): Promise<UserPasswordRecoveryToken | undefined> {
    const userPasswordRecoveryToken = this.userPasswordRecoveryTokens.find(
      item => item.token === token,
    );

    return userPasswordRecoveryToken;
  }

  public async generate(user_id: string): Promise<UserPasswordRecoveryToken> {
    const userPasswordRecoveryToken = new UserPasswordRecoveryToken();

    Object.assign(userPasswordRecoveryToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userPasswordRecoveryTokens.push(userPasswordRecoveryToken);

    return userPasswordRecoveryToken;
  }
}

export default FakeUserPasswordRecoveryTokensRepository;
