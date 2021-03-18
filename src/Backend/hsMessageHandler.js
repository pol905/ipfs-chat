import { createDB, openDB } from "./initialHandshake";

const messageHandler = async (
    ipfs,
    orbitdb,
    data,
    rooms,
    setRooms,
    setMessages
) => {
    const { nodeID, type } = data;
    const p1 = orbitdb.id.slice(-6);
    const p2 = nodeID.slice(-6);
    if (type === 0) {
        const newRoom = await createDB(p1, p2, orbitdb, data, setMessages);
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            to: nodeID,
            roomID: newRoom.address.toString(),
            type: 1,
        });

        ipfs.pubsub.publish("_OrbitDB._p2p._InitialHandshake", res);

        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        }); // Handle Ethereum Wallet addresses later
        setRooms((prevState) => ({ ...prevState, [nodeID]: newRoom }));
        console.log("Node B(step 1):", await rooms.all);
    } else if (type === 1) {
        const newRoom = await openDB(orbitdb, data, setMessages);
        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        });
        setRooms((prevState) => ({ ...prevState, [nodeID]: newRoom }));
        console.log("Node A(step 2):", await rooms.all);
    }
};

export default messageHandler;
