import React from "react";
import { Avatar } from "@material-ui/core";

function PeerCard({ rooms, setCurrRoom, roomName }) {
    const selectRoom = () => {
        setCurrRoom({ [roomName]: rooms[roomName] });
    };
    return (
        <div
            className="w-100-ns flex justify-start hover-bg-mid-gray pointer"
            onClick={selectRoom}
        >
            <div className="pa3 w-20">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${rooms[roomName][1]}.svg`}
                />
            </div>
            <div className="flex justify-between bb-ns white-80 sans-serif w-70">
                <div className="mt3">
                    <h3 className="mv0">{roomName.slice(-6)}</h3>
                </div>
            </div>
        </div>
    );
}

export default PeerCard;
