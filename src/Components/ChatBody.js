import React, { useEffect } from "react";
import "../css/ChatBody.css";

function ChatBody({ currRoom, messages, setMessages }) {
    let room;
    if (currRoom) {
        room = Object.keys(currRoom)[0];
    }
    useEffect(() => {
        if (currRoom) {
            console.log(messages);
            const msgs = currRoom[room]
                .iterator({ limit: -1 })
                .collect()
                .map((e) => e.payload.value);
            console.log(msgs);
            setMessages((prevState) => ({ ...prevState, [room]: msgs }));
        }
    }, [currRoom]);
    return (
        <div className="h-77">
            {messages[room]
                ? Object.values(messages[room]).map(
                      ({ from, message, time, type }, index) => {
                          return (
                              <p key={index} className="bg-green">
                                  {message} <span>{time}</span>
                              </p>
                          );
                      }
                  )
                : undefined}
        </div>
    );
}

export default ChatBody;
