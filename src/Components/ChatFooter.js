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
        <div className="w-100 h-19 bg-dark-gray flex gray bl bt">
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    type="text"
                    size="120"
                    className="mt3 ml4 br-pill h-25 input-style"
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
