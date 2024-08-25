import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/home";
import Chat from "./Pages/Chat/chat";
import ChatProvider from './Context/ChatProvider';

function App() {
  return (
    <Router>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;
