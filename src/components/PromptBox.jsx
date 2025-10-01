import { useState } from 'react'
import Quiz from './quiz'
import "../App.css"
import { quizQuestions } from './data'
import CreateQuiz from './CreateQuiz'
import LocalStorageRepo from '../repo/localStorageRepo'
import { Link } from "react-router-dom";
function PromptBox() {
    const [name, setName] = useState("")
    const [isQuiz, setIsQuiz] = useState(false)
    // LocalStorageRepo.save("Questions", quizQuestions)
    // const getQuestions = LocalStorageRepo.get('Questions')

    // console.log(getQuestions)

    return (
        <>
            {<div className='quiz-app'>
                <Link to="/create-quiz"><button className='create-quiz-btn'>Create Quiz</button></Link>
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