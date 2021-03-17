import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "../css/ChatBody.css";

function ChatBody({ currRoom, messages, setMessages, who }) {
    let room;
    if (currRoom) {
        room = Object.keys(currRoom)[0];
    }
    useEffect(() => {
        if (currRoom) {
            const msgs = currRoom[room]
                .iterator({ limit: -1 })
                .collect()
                .map((e) => e.payload.value);
            setMessages((prevState) => ({ ...prevState, [room]: msgs }));
        }
    }, [currRoom]);
    return (
        <SimpleBar className="h-81 chat-bg">
            {messages[room]
                ? Object.values(messages[room]).map(
                      ({ from, message, time, type }, index) => {
                          return (
                              <p
                                  key={index}
                                  className={
                                      from === who
                                          ? "chat-receiver"
                                          : "chat-message"
                                  }
                              >
                                  {message}
                                  <span className="chat-timestamp">{time}</span>
                              </p>
                          );
                      }
                  )
                : undefined}
        </SimpleBar>
    );
}

export default ChatBody;
