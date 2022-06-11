import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChatContextProvider} from './ContextManager/ChatContext';
import { SocketProvider } from './ContextManager/SocketContext';
import { ThemeContextProvider } from './ContextManager/ThemeContext';
ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <SocketProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
      </SocketProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

