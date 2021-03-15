import { Avatar } from "@material-ui/core";
import React from "react";

function PeerCard() {
    return (
        <div className="flex hover-bg-mid-gray pointer">
            <div className="pa3">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${String(
                        Math.random()
                    )}.svg`}
                />
            </div>
            <div className="flex justify-between bb-ns white-80 sans-serif w-75">
                <div className="mt3">
                    <h3 className="mv0">Supreeth Bannur</h3>
                    <h5 className="mt2">Last message....</h5>
                </div>
                <time className="mt4">03:52 PM</time>
            </div>
        </div>
    );
}

export default PeerCard;
