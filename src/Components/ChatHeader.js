import { Avatar } from "@material-ui/core";
import React from "react";

function ChatHeader({ currRoom }) {
    const roomName = Object.keys(currRoom)[0];
    const prof = currRoom[roomName][1];
    return (
        <div
            style={{ height: "10%" }}
            className="w-100 pa2 bg-mid-gray flex gray bb"
        >
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${prof}.svg`}
            />
            <h3 className="mh3 mt2 mb-10 white sans-serif">
                {roomName.slice(-6)}
            </h3>
        </div>
    );
}

export default ChatHeader;
