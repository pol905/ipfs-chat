import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";

function Sidebar({ ipfs, orbit, rooms }) {
    return (
        <div className="fl w-30 vh-100 bg-dark-gray gray br">
            <SidebarHeader ipfs={ipfs} orbit={orbit} />
            <SidebarBody rooms={rooms} />
        </div>
    );
}

export default Sidebar;
