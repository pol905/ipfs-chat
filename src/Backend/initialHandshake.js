import { addNewMessage } from "./messageHandler";
//Creates a new eventlog DB instance
const createDB = async (p1, p2, orbitdb, data, setMessages) => {
    const { pubKey } = data;
    const options = {
        accessController: {
            write: [orbitdb.identity.id, pubKey],
        },
    };
    const db = await orbitdb.eventlog(p1 + p2, options);
    await db.load();
    db.events.on("replicated", () => {
        const message = db
            .iterator()
            .collect()
            .map((e) => e.payload.value)[0];
        addNewMessage(message.from.slice(-6), setMessages, message);
    });
    return db;
};
//Opens a eventlog DB from hash
const openDB = async (orbitdb, data, setMessages) => {
    const { roomID } = data;
    const db = await orbitdb.eventlog(roomID);
    await db.load();
    db.events.on("replicated", () => {
        const message = db
            .iterator()
            .collect()
            .map((e) => e.payload.value)[0];
        addNewMessage(message.from.slice(-6), setMessages, message);
    });
    return db;
};

export { createDB, openDB };
