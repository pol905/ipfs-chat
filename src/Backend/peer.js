import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import messageHandler from "./hsMessageHandler";
import libp2pBundle from "./libp2pBundle";
import { openDB } from "./initialHandshake";

const peer = async (setRooms) => {
    const ipfs = await IPFS.create({ libp2p: libp2pBundle });
    const orbitdb = await OrbitDB.createInstance(ipfs);
    const rooms = await orbitdb.keyvalue("rooms");
    await rooms.load();
    // await rooms.drop();

    const allRooms = await rooms.all;
    Object.keys(allRooms).forEach(async (room) => {
        const db = await openDB(orbitdb, allRooms[room]);
        console.log(db);
        setRooms((prevState) => ({ ...prevState, [room]: db }));
    });

    ipfs.pubsub.subscribe(orbitdb.id.slice(-6) + "_private", (msg) => {
        const data = JSON.parse(msg.data.toString());
        messageHandler(ipfs, orbitdb, data, rooms, setRooms);
    });

    return { ipfs, orbitdb };
};

export default peer;
