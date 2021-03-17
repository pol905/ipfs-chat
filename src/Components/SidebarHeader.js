import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

function SidebarHeader({ ipfs, orbit }) {
    const openPrompt = async () => {
        const peerID = prompt("Enter Peer ID");
        if (peerID) {
            const p1 = peerID.slice(-6) + "_private";
            const nodeID = orbit.id;
            const req = JSON.stringify({
                nodeID,
                pubKey: orbit.identity.id,
                type: 0,
            });
            await ipfs.swarm.connect(
                `/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/${peerID}`
            );
            ipfs.pubsub.publish(p1, req);
        }
    };

    return (
        <div className="w-100 bg-mid-gray pa2 flex justify-between gray bb">
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
