import { Resolver, Query, Arg } from 'type-graphql';
import { User } from "./user.type";
import { UsersProvider } from "./users.provider";

@Resolver(of => User)
export class UserResolver {
    constructor(private usersProvider: UsersProvider){}

    @Query(returns => User, { nullable: true })
    user(@Arg('id') id: string) {
        return this.usersProvider.getUserById(id);
    }
}