import {createContext} from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const ws = over(new SockJS('http://localhost:8080/ws'));

export const SocketContext = createContext(ws);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
);
