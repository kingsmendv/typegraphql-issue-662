import { Inject, Injectable } from '@graphql-modules/di';
import { User } from './user.type';
import { USERS } from './users.symbol';

@Injectable()
export class UsersProvider {

  constructor(
    @Inject(USERS) private users: User[],
  ) {}

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }
}