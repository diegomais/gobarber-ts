import UserPasswordRecoveryToken from '@modules/users/infra/typeorm/entities/UserPasswordRecoveryToken';

export default interface IUserPasswordRecoveryTokensRepository {
  findByToken(token: string): Promise<UserPasswordRecoveryToken | undefined>;
  generate(user_id: string): Promise<UserPasswordRecoveryToken>;
}
