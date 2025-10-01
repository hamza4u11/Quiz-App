import React, { useState, useEffect, useRef } from 'react'
import '../App.css'

function CreateQuiz() {
    const [quizName, setQuizName] = useState("")
    const [countQuestion, setCountQuestion] = useState(0)
    const [countOption, SetCountOption] = useState(0)
    const [question, setQuestion] = useState([])



    console.log(countQuestion)
    console.log(countOption)
    console.log(quizName)

    return (
        <>
            <div className="create-quiz">
                <h1>Create Your Quiz</h1>
                <div className="form-group">
                    <label htmlFor="quiz-name">Enter Quiz Name</label>
                    <input type="text"
                        name="quiz-name"
                        id="quiz-name"
                        placeholder="Enter Quiz Name"
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="questions">Number of Questions</label>
                    <input type="number"
                        name="questions"
                        id="questions"
                        placeholder="Enter number of questions"
                        onChange={(e) => setCountQuestion(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="options">Number of Options</label>
                    <input type="number"
                        name="options"
                        id="options"
                        placeholder="Enter number of options"
                        onChange={(e) => SetCountOption(Number(e.target.value))}
                    />
                </div>
                {[...Array(countQuestion)].map((_, qIndex) => (
                    <div className="question-block" key={qIndex}>
                        <input
                            type="text"
                            className="question-input"
                            placeholder={`Enter Question ${qIndex + 1}`}
                        />
                        <div className="options">
                            {[...Array(countOption)].map((_, oIndex) => (
                                <input
                                    type="text"
                                    className="option-input"
                                    key={oIndex}
                                    placeholder={`Option ${oIndex + 1}`}
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            className="question-input"
                            placeholder="Enter the correct Answer"
                        />
                    </div>
                ))}
                <button className='create-quiz-btn' >Generate Quiz</button>
            </div>
        </>
    );
}
export default CreateQuiz;