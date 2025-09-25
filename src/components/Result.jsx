import React, { useState, useEffect} from 'react';
import Quiz from './quiz'
import "../App.css"
import { quizQuestions } from './data';
import PromptBox from './promptBox';

function Result(props) {
    const [tryQuiz, setTryQuiz] = useState(false)


    const tryAgain = () => {
        setTryQuiz(true)
    }

    const optionsArr = Object.entries(props.options || []);
    // const optionArray= props.options 
    // useEffect(() => {
    // const existingData = localStorage.getItem("Responses")
    // const data = existingData ? JSON.parse(existingData) : []
   // console.log("data: ",data)
    // const newRecord = [{
    //     ...optionArray,
    //     name : props.name 
    // }]
//    console.log('Data' ,newRecord)
//     data.push(newRecord)
   // console.log('New Data', newData)


//    localStorage.setItem("Responses", JSON.stringify(data) )
// }, [props.name]) 
    

//

    //console.log(optionsArr)
    
    //const checkPreviousRecord= JSON.parse(localStorage.getItem(props.name))
    
    //localStorage.setItem(props.name,optionsArr)
    //console.log(checkPreviousRecord)
    // const optionsArr = []
    // for (let key in props.options) {
    //     optionsArr.push({ key: key, value: props.options[key]})
    // }
    //console.log(optionsArr)
    //const optionsArr = Object.entries(props.options);
   // console.log(optionsArr)

    return (
        <>
            {tryQuiz ? (
                <PromptBox />
            ) :  (
                <div className=" show-score"><div className="score-box">
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
                    <button className='btn-next' onClick={tryAgain} > TRY AGAIN</button>
                </div>
                    {/* <h1 > Your score : {score} / {quizQuestions.length} </h1> */}

                </div>
            )
            }

        </>
    );
}
export default Result;