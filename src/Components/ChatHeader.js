import { Avatar } from "@material-ui/core";
import React from "react";

function ChatBody() {
    return (
        <div className="w-100 bg-mid-gray pa3 flex gray bb">
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${String(
                    Math.random()
                )}.svg`}
                className="mb2"
            />
            <h3 className="mt1 mh3 white sans-serif">Supreeth Bannur</h3>
        </div>
    );
}

export default ChatBody;
