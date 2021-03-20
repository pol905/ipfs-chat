import { useEffect, useState, useRef } from "react";

//Custom hook to keep track of the current account on metamasl=k
function useStateRef(initialValue) {
    const [metamaskStatus, setMetamaskStatus] = useState(initialValue);

    const currEthAddr = useRef(metamaskStatus[2]);
    useEffect(() => {
        currEthAddr.current = metamaskStatus[2];
    }, [metamaskStatus]);
    return [metamaskStatus, setMetamaskStatus, currEthAddr];
}

export default useStateRef;
