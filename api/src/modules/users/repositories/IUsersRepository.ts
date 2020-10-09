import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
  update(user: User): Promise<User>;
}
