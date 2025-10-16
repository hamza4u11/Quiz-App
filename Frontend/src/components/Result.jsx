import React, { useState, useEffect } from 'react';
import Quiz from './quiz'
import "../App.css"
import { quizQuestions } from './data';
import PromptBox from './promptBox';
import AllResults from './AllResults'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
// import { saveRecord } from '../services/save-record';
import axios from 'axios';




function Result(props) {
    const [tryQuiz, setTryQuiz] = useState(false)
    const optionsArr = Object.entries(props.options || []);
    const result = useSelector((state) => state.result)
    const name = useSelector((state) => state.name)

    const API = " http://localhost:3000/save-record"
    const saveData = async () => {

        try {
            // const res = await saveRecord({
            //     userName: name,
            //     result: result,

            // });

            //console.log("API hit successfully")
            const res = await axios.post(API, {
                userName: name,
                result: result,
            })

        } catch (error) {
            console.log(error)
        }


    }



    return (
        <>
            {
                <div className=" show-score"><div className="score-box">
                    <div className="tabs">
                        <div className="tab active">Results</div>
                        <div className="tab" ><Link to="/all-results">All Results</Link></div>
                    </div>
                    <h1>Name:{name}</h1>
                    <h1 className="">
                        Result Dashboard
                    </h1>
                    <h2 className="score-text">
                        🎉 Your Score: {result} 🎉
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
                    <button className='btn-next' onClick={saveData} ><Link to="/prompt-box">TRY AGAIN</Link></button>
                </div>

                </div >
            }

        </>
    );
}
export default Result;