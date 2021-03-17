import React from "react";
import PeerCard from "./PeerCard";

function SidebarBody({ rooms, setCurrRoom }) {
    return (
        <div className="h-100 w-30 fixed bg-dark-gray overflow-y-scroll">
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
