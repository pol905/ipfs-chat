import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import messageHandler from "./hsMessageHandler";
import libp2pBundle from "./libp2pBundle";

const peer = async () => {
    const ipfs = await IPFS.create({ libp2p: libp2pBundle });
    const orbitdb = await OrbitDB.createInstance(ipfs);
    const rooms = await orbitdb.keyvalue("rooms");
    await rooms.load();
    // await rooms.drop();
    console.log(await rooms.all);

    ipfs.pubsub.subscribe(orbitdb.id.slice(-6) + "_private", (msg) => {
        const data = JSON.parse(msg.data.toString());
        messageHandler(ipfs, orbitdb, data, rooms);
    });
    return { ipfs, orbitdb };
};

export default peer;
