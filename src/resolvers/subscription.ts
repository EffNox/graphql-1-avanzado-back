import { IResolvers } from "graphql-tools";

const subscription: IResolvers = {
    Subscription: {
        changeVotes: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('CHANGE_VOTES')
        }
    }
}

export default subscription;
