import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";

function Sidebar({ ipfs, orbit }) {
    return (
        <div className="fl w-30 vh-100 gray br">
            <SidebarHeader ipfs={ipfs} orbit={orbit} />
            <SidebarBody />
        </div>
    );
}

export default Sidebar;
