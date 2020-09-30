import UserPasswordRecoveryToken from '@modules/users/infra/typeorm/entities/UserPasswordRecoveryToken';

export default interface IUserRepository {
  generate(user_id: string): Promise<UserPasswordRecoveryToken>;
}
