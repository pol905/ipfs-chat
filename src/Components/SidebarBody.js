import React from "react";
import PeerCard from "./PeerCard";

function SidebarBody({ rooms, setCurrRoom }) {
    return (
        <div className="pre w-100 bg-dark-gray overflow-x-hidden overflow-y-hidden">
            {Object.keys(rooms).map((roomName, index) => {
                return (
                    <PeerCard
                        key={index}
                        roomName={roomName}
                        rooms={rooms}
                        setCurrRoom={setCurrRoom}
                    />
                );
            })}
        </div>
    );
}

export default SidebarBody;
