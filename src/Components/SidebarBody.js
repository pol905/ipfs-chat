import React from "react";
import PeerCard from "./PeerCard";

function SidebarBody({ rooms }) {
    console.log(rooms);
    return (
        <div className="pre w-100 bg-dark-gray overflow-x-hidden overflow-y-hidden">
            {Object.keys(rooms).map((roomName, index) => {
                console.log(rooms);
                return <PeerCard key={index} roomName={roomName} />;
            })}
        </div>
    );
}

export default SidebarBody;
