import { useState } from 'react'
import Quiz from './quiz'
import "../App.css"







function PromptBox() {
    const [name, setName] = useState("")
    const [isQuiz, setIsQuiz] =useState(false)

    const quiz = () => {
        setIsQuiz(true)
    //     console.log(name)
    }

    return (
        <>

        {isQuiz ? 
        (
            <Quiz name={name} />
        ):(
             <div className='quiz-app'>
                <h1 className='welcome'>Please enter your name:</h1>
                <input
                    type="text"
                    placeholder="Type your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className='btn-next' onClick={quiz} >Start Quiz </button>


            </div>

        )}
           

        </>
    );
}
export default PromptBox;