import React, { useState } from "react";
import "../css/ChatFooter.css";
import { addNewMessage } from "../Backend/messageHandler";
function ChatFooter({ currRoom, setMessages }) {
    const [message, setMessage] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        if (currRoom) {
            const roomName = Object.keys(currRoom)[0];
            const db = currRoom[roomName];
            const { id } = await db._ipfs.id();
            const msg = {
                from: id,
                message,
                time: new Date().toLocaleTimeString(),
                type: 0,
            };
            db.add(msg);
            addNewMessage(roomName, setMessages, msg);
        } else {
            console.log("Select a Chat First!!!!");
        }
        setMessage("");
    };
    return (
        <div className="w-100 h-10 bg-dark-gray gray bl bt">
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    type="text"
                    className="mt3 ml4 br-pill h-25 input-style w-90"
                    placeholder="Enter your message......."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" hidden={true}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ChatFooter;
