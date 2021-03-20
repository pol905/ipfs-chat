import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";

function Sidebar({ ipfs, orbit, rooms, metamaskStatus, setCurrRoom, profile }) {
    return (
        <div className="fl w-30 vh-100 bg-dark-gray gray br">
            <SidebarHeader
                ipfs={ipfs}
                orbit={orbit}
                metamaskStatus={metamaskStatus}
                profile={profile}
            />
            <SidebarBody rooms={rooms} setCurrRoom={setCurrRoom} />
        </div>
    );
}

export default Sidebar;
