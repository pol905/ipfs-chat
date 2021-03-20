import { useEffect, useState, useRef } from "react";
function useStateRef(initialValue) {
    const [metamaskStatus, setMetamaskStatus] = useState(initialValue);

    const currEthAddr = useRef(metamaskStatus[2]);
    useEffect(() => {
        currEthAddr.current = metamaskStatus[2];
    }, [metamaskStatus]);
    return [metamaskStatus, setMetamaskStatus, currEthAddr];
}

export default useStateRef;
