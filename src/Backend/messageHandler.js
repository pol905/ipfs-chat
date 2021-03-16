const addNewMessage = (roomName, setMessages, msg) => {
    console.log(setMessages);
    setMessages((prevState) => {
        let newState;
        if (!!prevState[roomName]) {
            newState = {
                ...prevState,
                [roomName]: [...prevState[roomName], msg],
            };
        } else {
            newState = {
                ...prevState,
                [roomName]: [msg],
            };
        }
        console.log(newState);
        return newState;
    });
};

export { addNewMessage };
