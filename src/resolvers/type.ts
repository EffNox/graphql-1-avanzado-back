import { IResolvers } from "graphql-tools";
import { getCharacterVotes } from "../utils/db-operations";

const type: IResolvers = {
    Character: {
        votes: async (parent: any, _, { db }) => await getCharacterVotes(db, parent.id),
        photo: parent => `https://raw.githubusercontent.com/graphql-course/5-breaking-bad-graphql-voting/master/photos/${parent.photo}`
    }
}

export default type;
