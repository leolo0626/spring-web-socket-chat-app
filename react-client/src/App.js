import React, {useContext, useEffect}from 'react';

// import ChatRoom from './components/ChatRoom';
// import { LoginForm } from './components/LoginForm';
import { ChatContext } from './ContextManager/ChatContext';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';
import Analytics from './pages/Analytics/Analytics';
import Messaging from './pages/Messaging/Messaging';

const App = () => {
  const {userState, connection : { connect }} = useContext(ChatContext);
  const [userData, _] = userState;

  const registerUser = () => {
    connect();
  }
  
  useEffect(()=>{
    console.log(userData.connected)
  }, [userData.connected])

  return (
    <>
      {/* {userData.connected ?
        <ChatRoom /> : 
        <LoginForm onClick={registerUser}/>
      } */}
      <Router>
        <Routes>
          <Route path="/dashboard" element={ <DashBoard/>}/>
          <Route path="/analytics" element={ <Analytics/>}/>
          <Route path="/messaging" element={ <Messaging/>}/>
        </Routes>
      </Router>

    </>



  )
}

export default App;

