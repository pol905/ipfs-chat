import React, { useState } from "react";
import "../css/ChatFooter.css";
function ChatFooter() {
    const [message, setMessage] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        setMessage("");
    };
    return (
        <div className="w-100 h-23 bg-dark-gray flex gray bl bt">
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    type="text"
                    size="120"
                    className="mt3 ml4 br-pill h-25"
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
