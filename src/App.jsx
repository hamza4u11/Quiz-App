import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './components/quiz'
import Welcome from './components/Welcome'
import PromptBox from './components/promptBox'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllResults from './components/AllResults'
import Result from './components/result'
import CreateQuiz from './components/CreateQuiz'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/prompt-box" element={<PromptBox />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Result />} />
          <Route path="/all-results" element={<AllResults />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
