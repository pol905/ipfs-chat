import { createDB, openDB } from "./initialHandshake";
import { addNewMessage } from "./messageHandler";

//Handles handshake messages in pubsub
const messageHandler = async (
    ipfs,
    orbitdb,
    data,
    rooms,
    currEthAddr,
    currDB,
    setRooms,
    setMessages
) => {
    const { nodeID, type } = data;
    const p1 = orbitdb.id.slice(-6);
    const p2 = nodeID.slice(-6);

    // Request for new private chat
    if (type === 0) {
        //Create new DB and send DB hash(/orbitdb/<hash>/dbName) back to initator
        const newRoom = await createDB(p1, p2, orbitdb, data, setMessages);
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            roomID: newRoom.address.toString(),
            type: 1,
        });

        ipfs.pubsub.publish(p2 + "_private", res);

        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
        });

        setRooms((prevState) => ({
            ...prevState,
            [nodeID]: [newRoom, String(Math.random())],
        }));
    } else if (type === 1) {
        // Receive new dbHash and open DB
        const newRoom = await openDB(orbitdb, data, setMessages);

        await rooms.set(nodeID, {
            roomID: newRoom.address.toString(),
        });

        setRooms((prevState) => ({
            ...prevState,
            [nodeID]: [newRoom, String(Math.random())],
        }));
    } else if (type === 2) {
        //Request for eth_wallet_address for payment
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            ethAddr: currEthAddr.current,
            type: 3,
        });

        ipfs.pubsub.publish(p2 + "_private", res);
    } else if (type === 3) {
        const { ethAddr } = data;
        const { chainId } = window.ethereum;
        const amount = prompt("Enter the amount");
        if (currEthAddr.current) {
            if (amount) {
                //hex encoded amount
                const txAmount =
                    "0x" + (Number(amount) * 10 ** 18).toString(16);

                if (!ethAddr) {
                    alert("Looks like the receipient hasn't set up payments");
                } else {
                    const txParams = {
                        from: currEthAddr.current,
                        to: ethAddr,
                        value: txAmount,
                    };
                    try {
                        const txHash = await window.ethereum.request({
                            method: "eth_sendTransaction",
                            params: [txParams],
                        });
                        addTransaction(
                            p2,
                            currDB,
                            orbitdb,
                            txHash,
                            setMessages,
                            Number(chainId),
                            amount
                        );
                    } catch (e) {
                        alert(e.message);
                    }
                }
            }
        }
    } else if (type === 4) {
        if (!currEthAddr.current) {
            alert(
                "You need to setup metamask to be able to send requested amount"
            );
            return;
        }
        const { amount } = data;
        const { rcvAccount } = data;
        const { chainId } = window.ethereum;
        const txAmount = "0x" + (Number(amount) * 10 ** 18).toString(16);
        const txParams = {
            from: currEthAddr.current,
            to: rcvAccount,
            value: txAmount,
        };
        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams],
            });
            addTransaction(
                p2,
                currDB,
                orbitdb,
                txHash,
                setMessages,
                Number(chainId),
                amount
            );
        } catch (e) {
            alert(e.message);
        }
    }
};

//Write transaction details to DB
const addTransaction = (
    p2,
    currDB,
    orbitdb,
    txHash,
    setMessages,
    chainID,
    amount
) => {
    // currDB.current = {roomName : [db, profilePic]}
    const db = Object.values(currDB.current)[0][0];
    const msg = {
        from: orbitdb.id,
        type: 1,
        amount,
        txHash,
        chainID,
        time: new Date().toLocaleTimeString(),
    };
    db.add(msg);
    addNewMessage(p2, setMessages, msg);
};

export default messageHandler;
