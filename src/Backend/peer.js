import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import messageHandler from "./hsMessageHandler";
import libp2pBundle from "./libp2pBundle";
import { openDB } from "./initialHandshake";
import detectEthereumProvider from "@metamask/detect-provider";

// Performs startup functions
const peer = async (
    setRooms,
    setMessages,
    setMetamaskStatus,
    currEthAddr,
    currDB
) => {
    const ipfs = await IPFS.create({ libp2p: libp2pBundle });
    const orbitdb = await OrbitDB.createInstance(ipfs);
    //DB to store private chat dbHashs
    const rooms = await orbitdb.keyvalue("rooms");
    await rooms.load();

    const allRooms = await rooms.all;
    //Fetch all rooms
    Object.keys(allRooms).forEach(async (room) => {
        const db = await openDB(
            orbitdb,
            { roomID: allRooms[room].roomID },
            setMessages
        );
        // await db.drop();
        // await rooms.drop();
        setRooms((prevState) => ({
            ...prevState,
            [room]: [db, String(Math.random())],
        }));
    });

    ipfs.pubsub.subscribe(orbitdb.id.slice(-6) + "_private", (msg) => {
        const data = JSON.parse(msg.data.toString());
        messageHandler(
            ipfs,
            orbitdb,
            data,
            rooms,
            currEthAddr,
            currDB,
            setRooms,
            setMessages
        );
    });

    detectMetamask(setMetamaskStatus, true);

    return { ipfs, orbitdb };
};

const detectMetamask = async (setMetamaskStatus, init = false) => {
    const provider = await detectEthereumProvider();
    if (provider) {
        setMetamaskStatus([1, "No Account"]);
        window.ethereum.on("accountsChanged", ([walletAddr]) => {
            if (walletAddr) {
                setMetamaskStatus([2, "Connected", walletAddr]);
            } else {
                setMetamaskStatus([1, "No Account", ""]);
            }
        });
        if (init) {
            const walletAddr = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (walletAddr.length !== 0) {
                setMetamaskStatus([2, "Connected", walletAddr[0]]);
                return;
            }
        }
    } else {
        setMetamaskStatus([0, "Metamask Error", ""]);
    }
};

const connectMetamask = async (metamaskStatus) => {
    if (metamaskStatus !== 0) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (e) {
            alert(e.message);
        }
    } else {
        alert("PLease Install Metamask.");
    }
};

export { peer, connectMetamask };
