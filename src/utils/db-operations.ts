export async function getAll(db: any) {
    return await db.collection('characters').find().sort({ id: 1 }).toArray()
}

export async function get(db: any, id: string) {
    return await db.collection('characters').findOne({ id })
}

export async function getCharacterVotes(db: any, id: string) {
    return await db.collection('votes').find({ character: id }).count()
}

export async function asignVoteId(db: any) {
    const lastVotes = await db.collection('votes').find().sort({ _id: -1 }).limit(1).toArray()
    if (!lastVotes.length) return 1
    return String(Number(lastVotes[0].id) + 1)
}

export async function getVote(db: any, id: string) {
    return await db.collection('votes').findOne({ id })
}

