import { IResolvers } from "graphql-tools";
import { Datetime } from "../utils/datetime";
import { asignVoteId, get, getAll, getVote } from "../utils/db-operations";

async function sendNoti(pubsub: any, db: any) {
    pubsub.publish('CHANGE_VOTES', { changeVotes: await getAll(db) })
}
const mutation: IResolvers = {
    Mutation: {
        async addVote(_, { character }, { db, pubsub }) {
            const slCha = await get(db, character)
            if (!slCha) return { status: false, msg: 'No existe', characters: await getAll(db) }
            const vote = { id: await asignVoteId(db), character, createdAt: new Datetime().getCurrentDateTime() }
            await db.collection('votes').insertOne(vote);
            sendNoti(pubsub, db)
            return { status: true, msg: 'Existe', characters: await getAll(db) }
        },
        async updateVote(_, { id, character }, { db, pubsub }) {
            const slCha = await get(db, character)
            if (!slCha) return { status: false, msg: 'No existe', characters: await getAll(db) }
            const slVot = await getVote(db, id)
            if (!slVot) return { status: false, msg: 'No existe Voto', characters: await getAll(db) }
            await db.collection('votes').updateOne({ id }, { $set: { character } })
            sendNoti(pubsub, db)
            return { status: true, msg: 'Actualizado', characters: await getAll(db) }
        },
        async deleteVote(_, { id }, { db, pubsub }) {
            const slCha = await getVote(db, id)
            if (!slCha) return { status: false, msg: 'No existe', characters: await getAll(db) }
            await db.collection('votes').deleteOne({ id })
            sendNoti(pubsub, db)
            return { status: true, msg: 'Eliminado', characters: await getAll(db) }
        }
    }
}

export default mutation;
