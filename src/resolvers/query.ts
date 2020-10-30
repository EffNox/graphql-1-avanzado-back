import { IResolvers } from "graphql-tools";
import { getAll, get } from "../utils/db-operations";

const query: IResolvers = {
    Query: {
        characters: async (_, __, { db }) => await getAll(db),
        character: async (_, { id }, { db }) => await get(db, id),
    }
}

export default query;
