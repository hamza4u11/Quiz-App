import React from 'react'
import { useState } from 'react';
import '../App.css'
import Quiz from './quiz'
import Result from './result';
import PromptBox from './promptBox';
import { Link } from "react-router-dom";


function Welcome() {
    const [promptBox, setPromptBox] = useState(false)
    //console.log(promptBox)
    return (

        <>
            {
                <div className='quiz-app'>

                    <h1 className='welcome'>Welcome to Quiz App</h1>
                    <h3>Are you ready?</h3>

                    <Link to="/prompt-box"><button className='btn-next'>Start Quiz </button></Link>


                </div >

            }

        </>

    );
}
export default Welcome;