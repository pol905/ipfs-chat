import React, { useState } from "react";
import "../css/ChatFooter.css";
import { addNewMessage } from "../Backend/messageHandler";
import { IconButton } from "@material-ui/core";
import SendTransactionIcon from "@material-ui/icons/CallMadeRounded";
import RequestTransactionIcon from "@material-ui/icons/CallReceivedRounded";
import { sendTransaction } from "../Backend/paymentHandlers";
import { rcvTransaction } from "../Backend/paymentHandlers";

function ChatFooter({ currRoom, setMessages, ipfs, orbit, currEthAddr }) {
    const [message, setMessage] = useState("");
    const roomName = Object.keys(currRoom)[0];
    const db = currRoom[roomName];
    const p1 = roomName.slice(-6);

    const sendMessage = async (e) => {
        e.preventDefault();
        const { id } = await db._ipfs.id();
        const msg = {
            from: id,
            message,
            time: new Date().toLocaleTimeString(),
            type: 0,
        };
        db.add(msg);
        addNewMessage(p1, setMessages, msg);
        setMessage("");
    };
    return (
        <div className="w-100 h-11 bg-dark-gray gray bl bt flex justify-between">
            <form onSubmit={sendMessage} className="w-85 h-25">
                <input
                    value={message}
                    type="text"
                    className="mt3 ml4 pa2 br-pill input-style w-100"
                    placeholder="Enter your message......."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" hidden={true}>
                    Submit
                </button>
            </form>
            <div className="mt2 w-15">
                <IconButton onClick={() => sendTransaction(ipfs, p1, db)}>
                    <SendTransactionIcon />
                </IconButton>
                <IconButton onClick = {()=> rcvTransaction(ipfs,p1,db, currEthAddr)}>
                    <RequestTransactionIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default ChatFooter;
