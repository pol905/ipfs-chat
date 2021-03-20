import React, { useEffect, useState } from "react";
import useStateRef from "./hooks/useStateRef";
import useCurrRoomRef from "./hooks/useCurrRoomRef";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";
import { peer } from "./Backend/peer";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./css/App.css";
import EmptyChat from "./images/chat.svg";

function App() {
    const [profile, setProfile] = useState(String(Math.random()));
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
                        profile={profile}
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
                        <div className="fl w-70 pa6 vh-100 bg-mid-gray">
                            <img
                                src={EmptyChat}
                                alt="Chat"
                                width="75%"
                                className="db center"
                            />
                        </div>
                    )}
                </>
            ) : (
                <CircularProgress className="center" />
            )}
        </div>
    );
}

export default App;
