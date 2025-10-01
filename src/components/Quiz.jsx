import { useState } from 'react'
import { quizQuestions } from './data'
import ProgressBar from './ProgressBar'
import '../App.css'
import LocalStorageRepo from "../repo/localStorageRepo";
import { Link } from 'react-router-dom';

function Quiz(props) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [options, setOptions] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const userName = props.name

  const total = quizQuestions.length;
  const handleOptionChange = (opt) => {
    setOptions((prev) => ({
      ...prev,
      [index]: opt,
    }))
  }
  const next = () => {
    const questionLength = quizQuestions.length - 2

    if (index === questionLength) {
      setIsSubmit(true)
    }

    if (options[index] === quizQuestions[index].answer) {
      setScore(score + 1)
      setCurrentQuestion(currentQuestion + 1)
    }
    if (index < quizQuestions.length - 1) {
      setIndex(index + 1)

    } else {
      setShowScore(true)
      const optionArray = options
      const existingData = localStorage.getItem("Responses")
      const data = existingData ? JSON.parse(existingData) : []
      const newRecord = {
        ...optionArray,
        name: props.name1
      }
      data.push(newRecord)
      LocalStorageRepo.save("Responses", data)

    }

  }
  const previous = () => {

    if (index <= quizQuestions.length - 1) {
      setIndex(index - 1)
      setCurrentQuestion(currentQuestion - 1)
    }
    if (!score == 0) {
      setScore(score - 1)
    }
  }
  //console.log(score)
  return (
    <>
      {
        <div className="quiz-app" id="quiz-app">
          <div style={{ width: "300px", margin: "50px auto" }}>
            <h3>Question {currentQuestion} of {total}</h3>
            <ProgressBar current={currentQuestion} total={total} index={index} />
          </div>
          <h1>Quiz App</h1>
          <h3>Question NO {index + 1}: {quizQuestions[index].question}</h3>
          {quizQuestions[index].options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={opt}
                checked={options[index] === opt} // restore saved answer
                onChange={() => handleOptionChange(opt)}
              />
              {opt}
              <br />
            </label>
          ))}
          <div className="buttons">
            <button className='btn-previous' onClick={previous} disabled={index == 0}  >Previous</button>

            {
              isSubmit ? (
                <Link to="/results"> <button className='btn-next' disabled={!options[index]}  > Submit</button></Link>
              ) : (
                <button className='btn-next' onClick={next} disabled={!options[index]}  > Next</button>

              )
            }
          </div>
        </div>
      }

    </>
  )
}
export default Quiz;



