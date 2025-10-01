import React, { useState, useEffect } from 'react'
import LocalStorageRepo from '../repo/localStorageRepo'
import '../App.css'

function CreateQuiz() {
    const [quizName, setQuizName] = useState("")
    const [countQuestion, setCountQuestion] = useState(0)
    const [countOption, SetCountOption] = useState(0)
    const [showQuiz, setQuiz] = useState(false)
    const [isCreate, setisCreate] = useState(false)
    const [quizQuestions, setQuizQuestions] = useState([])
    const [newQuiz, setNewQuiz] = useState([])



    useEffect(() => {
        const getQuestions = LocalStorageRepo.get("Questions")
        setQuizQuestions(getQuestions);
    }, []);
    //console.log("I am from Local Storage ", quizQuestions)
    const showQuizTrue = () => {
        setQuiz(true)
        setisCreate(true)
        if (showQuiz === true) {
            setQuiz(!true)
            setisCreate(!true)
        }
    }
    const setQuestions = (qIndex, value) => {
        const updated = [...newQuiz]
        updated[qIndex].question = value
        setNewQuiz(updated)

    }
    const setOptions = (qIndex, oIndex, value) => {
        const updated = [...newQuiz]
        updated[qIndex].options[oIndex] = value
        setNewQuiz(updated)
    }
    const setAnswer = (qIndex, value) => {
        const updated = [...newQuiz]
        updated[qIndex].answer = value
        setNewQuiz(updated)
    }
    console.log("New Quiz Array", newQuiz)
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
                {
                    showQuiz && ([...Array(countQuestion)].map((_, qIndex) => (
                        <div className="question-block" key={qIndex}>
                            <input
                                type="text"
                                className="question-input"
                                placeholder={`Enter Question ${qIndex + 1}`}
                                onChange={(e) => setQuestions(qIndex, e.target.value)}

                            />
                            <div className="options">
                                {[...Array(countOption)].map((_, oIndex) => (
                                    <input
                                        type="text"
                                        className="option-input"
                                        key={oIndex}
                                        placeholder={`Option ${oIndex + 1}`}
                                        onChange={(e) => setOptions(qIndex, oIndex, e.target.value)}
                                    />
                                ))}
                            </div>
                            <input
                                type="text"
                                className="question-input"
                                placeholder="Enter the correct Answer"
                                onChange={(e) => setAnswer(qIndex, e.target.value)}

                            />
                        </div>
                    )))
                }
                {isCreate ? (<button className='generate-quiz-btn' onClick={showQuizTrue}  >Create Quiz</button>
                ) : (
                    <button className='generate-quiz-btn' onClick={showQuizTrue}  >Generate Quiz</button>

                )
                }


            </div>
        </>
    );
}
export default CreateQuiz;