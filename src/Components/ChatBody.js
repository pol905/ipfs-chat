import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "../css/ChatBody.css";
import chains from "../Backend/chainID";

function ChatBody({ currRoom, messages, setMessages, who }) {
    const room = Object.keys(currRoom)[0];
    const p1 = room.slice(-6);

    useEffect(() => {
        const msgs = currRoom[room][0]
            .iterator({ limit: -1 })
            .collect()
            .map((e) => e.payload.value);
        setMessages((prevState) => ({ ...prevState, [p1]: msgs }));
    }, [currRoom]);

    return (
        <SimpleBar className="h-79 chat-bg">
            {messages[p1]
                ? Object.values(messages[p1]).map((msg, index) => {
                      const { from, time } = msg;
                      if (msg.type === 0) {
                          const { message } = msg;
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
                      const { chainID, amount, txHash } = msg;
                      return (
                          <p
                              key={index}
                              className={
                                  from === who
                                      ? "chat-receiver"
                                      : "chat-message"
                              }
                          >
                              {from === who ? "Sent: " : "Received: "}
                              {`${amount} ${chains[chainID][1]} on ${chains[chainID][0]} `}
                              (
                              <a
                                  href={`${chains[chainID][2]}${txHash}`}
                                  target="_blank"
                                  rel="noreferrer"
                              >
                                  Status
                              </a>
                              )<span className="chat-timestamp">{time}</span>
                          </p>
                      );
                  })
                : undefined}
        </SimpleBar>
    );
}

export default ChatBody;
