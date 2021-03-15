import React from "react";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";

function App() {
    return (
        <div className="overflow-y-hidden">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}

export default App;
