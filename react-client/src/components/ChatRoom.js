import React, { useEffect, useContext } from 'react'
import './ChatRoom.css';
import { ChatContext } from '../ContextManager/ChatContext';

const ChatRoom = () => {

    const { privateChatState, publicChatState, tabState, userState , connection : {stompClient}} = useContext(ChatContext);
    const [privateChats, setPrivateChats] = privateChatState;
    const [publicChats, setPublicChats] = publicChatState;
    const [tab, setTab] = tabState;
    const [userData, setUserData] = userState;
    
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }
    const sendValue = () => {
        console.log("Hello")
        console.log(stompClient)
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const handleKeyDown = (event) => {
        console.log("Hi I am Here")
        if (event.code === "Enter" && event.shiftKey) {
            if (tab === "CHATROOM") {
                sendValue();
            } else {
                sendPrivateValue();
            }

        }
    }
    return (
        <>
                    <div className="container">
                        <div className="chat-box">
                            <div className="member-list">
                                <ul>
                                    <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                                    {[...privateChats.keys()].map((name, index) => (
                                        <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                            {tab === "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {publicChats.map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text"
                                        className="input-message"
                                        placeholder="enter the message"
                                        value={userData.message}
                                        onChange={handleMessage}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                                </div>
                            </div>}
                            {tab !== "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message"
                                        placeholder="enter the message"
                                        value={userData.message}
                                        onChange={handleMessage}
                                        onKeyDown={handleKeyDown} />
                                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                                </div>
                            </div>}
                        </div>
                    </div>
        </>
    )
}

export default ChatRoom
