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
    const [rooms, setRooms] = useState({});
    useEffect(() => {
        const node = async () => await peer(setRooms);
        node().then(async ({ ipfs, orbitdb }) => {
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
                    <Sidebar ipfs={ipfs} orbit={orbit} rooms={rooms} />
                    <ChatWindow />
                </>
            ) : (
                <CircularProgress className="center" />
            )}
        </div>
    );
}

export default App;
