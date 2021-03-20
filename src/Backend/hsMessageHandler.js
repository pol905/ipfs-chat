import { createDB, openDB } from "./initialHandshake";
import { addNewMessage } from "./messageHandler";

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

    if (type === 0) {
        const newRoom = await createDB(p1, p2, orbitdb, data, setMessages);
        const res = JSON.stringify({
            nodeID: orbitdb.id,
            roomID: newRoom.address.toString(),
            type: 1,
        });

        ipfs.pubsub.publish(p2 + "_private", res);

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
    } else if (type === 2) {
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
        if (amount) {
            const txAmount = "0x" + (Number(amount) * 10 ** 18).toString(16);

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
    } else if (type === 4) {
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

const addTransaction = (
    p2,
    currDB,
    orbitdb,
    txHash,
    setMessages,
    chainID,
    amount
) => {
    const db = Object.values(currDB.current)[0];
    const msg = {
        from: orbitdb.id,
        type: 1,
        amount,
        txHash,
        chainID,
        time: new Date().toLocaleTimeString(),
    };
    console.log(msg);
    db.add(msg);
    addNewMessage(p2, setMessages, msg);
};

export default messageHandler;
