import React from 'react'
import { useState } from 'react';
import '../App.css'
import Quiz from './quiz'
import Result from './result';
import PromptBox from './promptBox';

function Welcome() {
   // const [startQuiz, setStartQuiz] = useState(false)
   const [promptBox, setPromptBox] = useState(false)


    // const quiz = () => {
    //     setStartQuiz(true)
    //     // setShowScore(true)
    // }
    const prompt= () => {
        setPromptBox(true)

    }
    //console.log(promptBox)
    return (

        <>
            {
                    promptBox ? (
                       // <Quiz />
                       <PromptBox/>

                    ) :
                        (
                            <div className='quiz-app'>
                                
                                <h1 className='welcome'>Welcome to Quiz App</h1>
                                <h3>Are you ready?</h3>
                                    
                                    <button className='btn-next' onClick={prompt}>Start Quiz </button>
                                {/* <button className='btn-next' onClick={quiz}> Start Quiz </button> */}

                            </div>
                        )
                
            }

        </>

    );
}
export default Welcome;