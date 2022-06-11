import React, {useState, createContext, useContext} from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { SocketContext } from './SocketContext';

export const ChatContext = createContext();

export const ChatContextProvider = props => {
    let stompClient = useContext(SocketContext);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        console.log(stompClient)
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("onConnected");
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }
    return (
        <ChatContext.Provider 
        value={{
            privateChatState : [privateChats, setPrivateChats],
            publicChatState : [publicChats, setPublicChats],
            tabState : [tab, setTab],
            userState : [userData, setUserData],
            connection : {
                connect, 
                stompClient
            }
        }}
        >
            {props.children}
        </ChatContext.Provider>
    )
}