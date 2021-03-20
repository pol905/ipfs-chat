import React, { useState } from "react";
import "../css/ChatFooter.css";
import { addNewMessage } from "../Backend/messageHandler";
import { IconButton } from "@material-ui/core";
import SendTransactionIcon from "@material-ui/icons/CallMadeRounded";
import RequestTransactionIcon from "@material-ui/icons/CallReceivedRounded";
import { sendTransaction } from "../Backend/paymentHandlers";
import { rcvTransaction } from "../Backend/paymentHandlers";

function ChatFooter({ currRoom, setMessages, ipfs, currEthAddr }) {
    const [message, setMessage] = useState("");
    const roomName = Object.keys(currRoom)[0];
    const db = currRoom[roomName][0];
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
        <div className="w-100 h-11 bg-dark-gray gray bl bt flex justify-start">
            <form onSubmit={sendMessage} className="ml5 w-75 h-100 center">
                <input
                    value={message}
                    type="text"
                    className="mt3 pa2 br-pill input-style w-100"
                    placeholder="Enter your message......."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" hidden={true}>
                    Submit
                </button>
            </form>
            <div className="mt0 pa2 w-15">
                <IconButton onClick={() => sendTransaction(ipfs, p1, db)}>
                    <SendTransactionIcon />
                </IconButton>
                <IconButton
                    onClick={() => rcvTransaction(ipfs, p1, db, currEthAddr)}
                >
                    <RequestTransactionIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default ChatFooter;
