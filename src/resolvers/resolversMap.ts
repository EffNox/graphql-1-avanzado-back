import { IResolvers } from "graphql-tools";
import mutation from "./mutation";
import query from "./query";
import subscription from "./subscription";
import type from "./type";

const resolvers: IResolvers = {
    ...query,
    ...type,
    ...mutation,
    ...subscription
}

export default resolvers;
