import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import styled from 'styled-components';
import Dashboard from './containers/Dashboard';
import { useState } from 'react';
import { useDisplay } from './containers/hooks/useDisplay';
import ChatRoom from './containers/ChatRoom';
import VideoRoom from './components/VideoRoom';
import VideoChatRoom from './components/VideoChatRoom';

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 1000px;
  margin: auto;
`;

function App() {
    /* global google */
    const {display, setDisplay, signedIn} = useDisplay();

    const [user, setUser] = useState({});


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chatroom/:id" element={<ChatRoom />} />
                <Route path="/chatroom/:id/:roomID" element={<VideoChatRoom />} />
            </Routes>
        </Router> 
    );
}

export default App;
