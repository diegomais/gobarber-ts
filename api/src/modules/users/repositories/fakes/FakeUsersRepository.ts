import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, name, password });

    this.users.push(user);

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users: providers } = this;

    if (except_user_id) {
      providers = this.users.filter(user => user.id !== except_user_id);
    }

    return providers;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findByID(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(item => item.id === user.id);

    Object.assign(this.users[findIndex], user);

    return this.users[findIndex];
  }
}

export default FakeUsersRepository;
