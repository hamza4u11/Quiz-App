import React, { useState, useEffect } from 'react';
import Quiz from './quiz'
import "../App.css"
import { quizQuestions } from './data';
import PromptBox from './promptBox';
import AllResults from './AllResults'
import { Link } from "react-router-dom";


function Result(props) {
    const [tryQuiz, setTryQuiz] = useState(false)
    const optionsArr = Object.entries(props.options || []);

    return (
        <>
            {
                <div className=" show-score"><div className="score-box">
                    <div className="tabs">
                        <div className="tab active">Results</div>
                        <div className="tab" ><Link to="/all-results">All Results</Link></div>
                    </div>
                    <h1>{props.name}</h1>
                    <h1 className="">
                        Result Dashboard
                    </h1>
                    <h2 className="score-text">
                        🎉 Your Score: {props.score} / {props.total} 🎉
                    </h2>
                    {/* Show selected options */}
                    <div className="answers-list">
                        <h3>Your Answers:</h3>
                        <ul>
                            {optionsArr.map(([index, value], i) => (
                                <li key={i}>
                                    <strong>Question {parseInt(index) + 1}:</strong> {value}{(value === quizQuestions[index].answer) ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; <strong> &nbsp;  &nbsp;  {quizQuestions[index].answer}  &nbsp; &#9989; </strong></span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className='btn-next'><Link to="/prompt-box">TRY AGAIN</Link></button>
                </div>

                </div >
            }

        </>
    );
}
export default Result;