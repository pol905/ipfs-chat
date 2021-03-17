import { Avatar } from "@material-ui/core";
import React from "react";

function ChatBody({ currRoom }) {
    return (
        <div className="w-100 h-10 pa2 bg-mid-gray flex gray bb">
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${String(
                    Math.random()
                )}.svg`}
            />
            <h3 className="mh3 mt2 mb-10 white sans-serif">
                {currRoom ? Object.keys(currRoom)[0] : undefined}
            </h3>
        </div>
    );
}

export default ChatBody;
