import React from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import "../css/ChatWindow.css";
import ChatFooter from "./ChatFooter";

function ChatWindow() {
    return (
        <div className="fl w-70 vh-100 chat-bg">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </div>
    );
}

export default ChatWindow;
