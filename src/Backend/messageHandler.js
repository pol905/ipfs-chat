//Maintains messages in each chat
const addNewMessage = (p1, setMessages, msg) => {
    setMessages((prevState) => {
        let newState;
        if (!!prevState[p1]) {
            newState = {
                ...prevState,
                [p1]: [...prevState[p1], msg],
            };
        } else {
            newState = {
                ...prevState,
                [p1]: [msg],
            };
        }
        return newState;
    });
};

export { addNewMessage };
