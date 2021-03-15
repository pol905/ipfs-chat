import React, { useEffect, useState } from "react";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";
import peer from "./Backend/peer";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./css/App.css";

function App() {
    // const [selectedRoom, setSelectedRoom] = useState("");
    // const [messages, setMessages] = useState({});
    const [ready, setReady] = useState(false);
    const [ipfs, setIPFS] = useState();
    const [orbit, setOrbit] = useState();

    useEffect(() => {
        const node = async () => await peer();
        node().then(({ ipfs, orbitdb }) => {
            setIPFS(ipfs);
            setOrbit(orbitdb);
            setReady(true);
        });
        return async () => await node.stop();
    }, []);

    return (
        <div className="overflow-y-hidden">
            {ready === true ? (
                <>
                    <Sidebar ipfs={ipfs} orbit={orbit} />
                    <ChatWindow />
                </>
            ) : (
                <CircularProgress className="center" />
            )}
        </div>
    );
}

export default App;
