import { useState } from 'react'
import Quiz from './quiz'
import "../App.css"
import { quizQuestions } from './data'
import CreateQuiz from './CreateQuiz'
import LocalStorageRepo from '../repo/localStorageRepo'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setName } from './action'
function PromptBox() {
    const [inputName, setInputName] = useState("")
    const [isQuiz, setIsQuiz] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()
    // LocalStorageRepo.save("Questions", quizQuestions)
    // const getQuestions = LocalStorageRepo.get('Questions')

    // console.log(getQuestions)


    // const handleNameChange = (e) => {
    //     const setinputName = e.target.value;

    //     // ✅ make sure setName returns an object
    //     console.log(setName(name)); // should show { type: 'SET_NAME', payload: 'value' }

    //     dispatch(setName(inputName));
    //     // ✅ dispatch plain object
    // };
    const handleNameChange = () => {
        dispatch(setName(inputName)) // ✅ dispatching a valid plain object
    }
    return (
        <>
            {<div className='quiz-app'>
                <Link to="/create-quiz"><button className='create-quiz-btn'>Create Quiz</button></Link>
                <h1 className='welcome'>Please enter your name:</h1>
                <input
                    type="text"
                    placeholder="Type your name..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)} required
                />
                <Link to="/quiz"><button className='btn-next' onClick={handleNameChange}>Start Quiz</button></Link>
            </div>
            }


        </>
    );
}
export default PromptBox;