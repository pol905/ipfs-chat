import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import messageHandler from "./hsMessageHandler";
import libp2pBundle from "./libp2pBundle";
import { openDB } from "./initialHandshake";
import detectEthereumProvider from "@metamask/detect-provider";

const peer = async (setRooms, setMessages, setMetamaskStatus) => {
    const ipfs = await IPFS.create({ libp2p: libp2pBundle });
    const orbitdb = await OrbitDB.createInstance(ipfs);
    const rooms = await orbitdb.keyvalue("rooms");
    await rooms.load();

    const allRooms = await rooms.all;

    Object.keys(allRooms).forEach(async (room) => {
        console.log(allRooms[room]);
        const db = await openDB(
            orbitdb,
            { roomID: allRooms[room].roomID },
            setMessages
        );
        // await db.drop();
        // await rooms.drop();
        setRooms((prevState) => ({ ...prevState, [room]: db }));
    });
    ipfs.pubsub.subscribe(orbitdb.id.slice(-6) + "_private", (msg) => {
        const data = JSON.parse(msg.data.toString());
        console.log(data);
        messageHandler(ipfs, orbitdb, data, rooms, setRooms, setMessages);
    });
    detectMetamask(setMetamaskStatus);

    return { ipfs, orbitdb };
};

const detectMetamask = async (setMetamaskStatus) => {
    const provider = await detectEthereumProvider();
    if (provider) {
        setMetamaskStatus([1, "No Account"]);
        window.ethereum.on("accountsChanged", ([walletAddr]) => {
            if (walletAddr) {
                setMetamaskStatus([2, "Connected"]);
            } else {
                setMetamaskStatus([1, "No Account"]);
            }
        });
    } else {
        setMetamaskStatus([0, "Metamask Error"]);
    }
};

const connectMetamask = async (metamaskStatus) => {
    if (metamaskStatus !== 0) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
};

export { peer, connectMetamask };
