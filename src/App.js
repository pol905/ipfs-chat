import React, { useEffect, useState } from "react";
import useStateRef from "./hooks/useStateRef";
import useCurrRoomRef from "./hooks/useCurrRoomRef";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";
import { peer } from "./Backend/peer";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./css/App.css";

function App() {
    const [ready, setReady] = useState(false);
    const [ipfs, setIPFS] = useState();
    const [orbit, setOrbit] = useState();
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState({});
    const [who, setWho] = useState("");
    const [currRoom, setCurrRoom, currDB] = useCurrRoomRef();
    const [metamaskStatus, setMetamaskStatus, currEthAddr] = useStateRef([
        0,
        "Metamask Error",
        "",
    ]);
    useEffect(() => {
        const node = async () =>
            await peer(
                setRooms,
                setMessages,
                setMetamaskStatus,
                currEthAddr,
                currDB
            );
        node().then(async ({ ipfs, orbitdb }) => {
            setIPFS(ipfs);
            setOrbit(orbitdb);
            setReady(true);
            setWho(orbitdb.id);
        });
        return async () => await node.stop();
    }, []);

    return (
        <div className="overflow-y-hidden">
            {ready === true ? (
                <>
                    <Sidebar
                        ipfs={ipfs}
                        orbit={orbit}
                        rooms={rooms}
                        metamaskStatus={metamaskStatus}
                        setCurrRoom={setCurrRoom}
                    />
                    {typeof currRoom !== "undefined" ? (
                        <ChatWindow
                            who={who}
                            currRoom={currRoom}
                            ipfs={ipfs}
                            messages={messages}
                            currEthAddr={currEthAddr.current}
                            setMessages={setMessages}
                        />
                    ) : (
                        <p>Hello</p>
                    )}
                </>
            ) : (
                <CircularProgress className="center" />
            )}
        </div>
    );
}

export default App;
