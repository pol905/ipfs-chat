import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

function SidebarHeader() {
    const openPrompt = () => {
        const peerID = prompt("Enter Peer ID");
        console.log(peerID);
    };
    return (
        <div className="w-100 bg-mid-gray pa3 flex justify-between gray bb">
            <Avatar
                src={`https://avatars.dicebear.com/api/human/${String(
                    Math.random()
                )}.svg`}
            />
            <IconButton onClick={openPrompt}>
                <AddIcon />
            </IconButton>
        </div>
    );
}

export default SidebarHeader;
