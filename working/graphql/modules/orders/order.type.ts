import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Order {
    @Field(type => ID)
    id: string;

    userId: string;
}
