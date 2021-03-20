const sendTransaction = async (ipfs, p1, db) => {
    const { id } = await db._ipfs.id();
    const req = JSON.stringify({
        nodeID: id,
        type: 2,
    });
    ipfs.pubsub.publish(p1 + "_private", req);
};

//Request amount from other user
const rcvTransaction = async (ipfs, p1, db, currEthAddr) => {
    const { id } = await db._ipfs.id();
    if (!currEthAddr) {
        alert("Please connect to metamask.");
    } else {
        const amount = prompt("Enter the amount requested");
        if (amount) {
            const req = JSON.stringify({
                nodeID: id,
                rcvAccount: currEthAddr,
                amount: amount,
                type: 4,
            });
            ipfs.pubsub.publish(p1 + "_private", req);
        }
    }
};

export { sendTransaction, rcvTransaction };
