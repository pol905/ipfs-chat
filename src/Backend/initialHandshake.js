const createDB = async (p1, p2, orbitdb, data) => {
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
        console.log(message);
    });
    return db;
};

const openDB = async (orbitdb, data) => {
    const { roomID } = data;
    const db = await orbitdb.eventlog(roomID);
    await db.load();
    db.events.on("replicated", () => {
        const message = db
            .iterator()
            .collect()
            .map((e) => e.payload.value)[0];
        console.log(message);
    });
    return db;
};

export { createDB, openDB };
