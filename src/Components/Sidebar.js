import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";

function Sidebar() {
    return (
        <div className="fl w-30 vh-100 gray br">
            <SidebarHeader />
            <SidebarBody />
        </div>
    );
}

export default Sidebar;
