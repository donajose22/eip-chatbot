import React from 'react';
import logo from './logo.svg';
import './App.css';
// import 'react-chatbot-kit/build/main.css';
import ChatbotButton from "./Components/ChatbotButton";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatbotButton isMaximizedChatbot={false} />} />
        <Route path="/maximize-chatbot" element={<ChatbotButton isMaximizedChatbot={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
