import React from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";

function ChatWindow({
    currRoom,
    messages,
    setMessages,
    who,
    ipfs,
    currEthAddr,
}) {
    return (
        <div className="fl w-70 vh-100">
            <ChatHeader currRoom={currRoom} />
            <ChatBody
                currRoom={currRoom}
                messages={messages}
                setMessages={setMessages}
                who={who}
            />
            <ChatFooter
                currRoom={currRoom}
                setMessages={setMessages}
                ipfs={ipfs}
                currEthAddr={currEthAddr}
            />
        </div>
    );
}

export default ChatWindow;
