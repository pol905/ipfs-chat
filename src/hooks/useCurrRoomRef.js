import { useEffect, useState, useRef } from "react";

//Custom hook to keep track of the current account on metamask
function useCurrRoomRef() {
    const [currRoom, setCurrRoom] = useState();

    const currDB = useRef(currRoom);
    useEffect(() => {
        currDB.current = currRoom;
    }, [currRoom]);
    return [currRoom, setCurrRoom, currDB];
}

export default useCurrRoomRef;
