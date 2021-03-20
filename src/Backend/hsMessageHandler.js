import { createDB, openDB } from "./initialHandshake";

const messageHandler = async (
    ipfs,
    orbitdb,
    data,
    rooms,
    currEthAddr,
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
        const chainID = window.ethereum.chainId;
        let amount;
        if (Number(chainID) === 80001) {
            amount = prompt("Enter the amount of MATIC tokens");
        } else {
            amount = prompt("Enter the amount of ETH tokens");
        }
        amount = "0x" + (Number(amount) * 10 ** 18).toString(16);

        if (!ethAddr) {
            alert("Looks like the receipient hasn't set up payments");
        } else {
            const txParams = {
                from: currEthAddr.current,
                to: ethAddr,
                value: amount,
            };
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams],
            });
            console.log(txHash);
        }
    }
};

export default messageHandler;
