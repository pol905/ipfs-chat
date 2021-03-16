import React from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import "../css/ChatWindow.css";
import ChatFooter from "./ChatFooter";

function ChatWindow({ currRoom, messages, setMessages }) {
    return (
        <div className="fl w-70 vh-100 chat-bg">
            <ChatHeader currRoom={currRoom} />
            <ChatBody
                currRoom={currRoom}
                messages={messages}
                setMessages={setMessages}
            />
            <ChatFooter currRoom={currRoom} setMessages={setMessages} />
        </div>
    );
}

export default ChatWindow;
