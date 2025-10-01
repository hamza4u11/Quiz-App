import { useState } from 'react'
import Quiz from './quiz'
import "../App.css"
import CreateQuiz from './CreateQuiz'
import { Link } from "react-router-dom";
function PromptBox() {
    const [name, setName] = useState("")
    const [isQuiz, setIsQuiz] = useState(false)
    return (
        <>
            {<div className='quiz-app'>
                <h1 className='welcome'>Please enter your name:</h1>
                <input
                    type="text"
                    placeholder="Type your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Link to="/quiz"><button className='btn-next'>Start Quiz</button></Link>
            </div>
            }


        </>
    );
}
export default PromptBox;