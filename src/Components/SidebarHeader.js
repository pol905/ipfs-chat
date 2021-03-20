import React from "react";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { connectMetamask } from "../Backend/peer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "status-indicator/styles.css";

function SidebarHeader({ ipfs, orbit, metamaskStatus }) {
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
            ipfs.pubsub.publish(p1, req);
        }
    };

    const StatusColor = () => {
        const statusCode = metamaskStatus[0];
        if (statusCode === 2) {
            return <status-indicator positive pulse />;
        } else if (statusCode === 1) {
            return <status-indicator intermediary pulse />;
        } else {
            return <status-indicator negative pulse />;
        }
    };

    return (
        <div
            style={{ height: "10%" }}
            className="w-100 bg-mid-gray pa2 flex justify-between gray bb"
        >
            <CopyToClipboard text={orbit.id}>
                <Tooltip
                    title="Copy nodeID to clipboard"
                    placement="right"
                    arrow
                >
                    <Avatar
                        src={`https://avatars.dicebear.com/api/human/${String(
                            Math.random()
                        )}.svg`}
                        className="pointer"
                    />
                </Tooltip>
            </CopyToClipboard>
            <div
                className="w-40 mt2 flex pointer"
                onClick={() => connectMetamask(metamaskStatus[0])}
            >
                <div className="w-30 pt2 flex justify-end">
                    <StatusColor />
                </div>
                <p className="w-60 pl2 mt1 white">{metamaskStatus[1]}</p>
            </div>
            <IconButton onClick={openPrompt}>
                <AddIcon />
            </IconButton>
        </div>
    );
}

export default SidebarHeader;
