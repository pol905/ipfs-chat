import { createDB, openDB } from "./initialHandshake";

const messageHandler = async (ipfs, orbitdb, data, rooms, setRooms) => {
    const { nodeID, type } = data;
    const p1 = orbitdb.id.slice(-6);
    const p2 = nodeID.slice(-6);

    if (type === 0) {
        const newRoom = await createDB(p1, p2, orbitdb, data);
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            roomID: newRoom.address.toString(),
            type: 1,
        });

        ipfs.pubsub.publish(p2 + "_private", res);

        await rooms.set(p2, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        }); // Handle Ethereum Wallet addresses later
        setRooms((prevState) => ({ ...prevState, [p2]: newRoom }));
        console.log("Node B(step 1):", await rooms.all);
    } else if (type === 1) {
        const newRoom = await openDB(orbitdb, data);
        await rooms.set(p2, {
            roomID: newRoom.address.toString(),
            walletAddr: "",
        });
        setRooms((prevState) => ({ ...prevState, [p2]: newRoom }));
        console.log("Node A(step 2):", await rooms.all);
    }
};

export default messageHandler;
