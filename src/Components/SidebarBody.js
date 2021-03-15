import React from "react";
import PeerCard from "./PeerCard";

function SidebarBody() {
    return (
        <div className="pre w-100 bg-dark-gray overflow-y-hidden">
            {Array(20)
                .fill(0)
                .map((num, index) => {
                    return <PeerCard key={index} />;
                })}
        </div>
    );
}

export default SidebarBody;
