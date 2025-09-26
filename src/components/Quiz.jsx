import { useState } from 'react'
import { quizQuestions } from './data'
import Result from './result'
import ProgressBar from './ProgressBar'
import '../App.css'
import LocalStorageRepo from "../repo/localStorageRepo";

function Quiz(props) {
  const [index, setIndex] = useState(0)
  //const [answer, setAnswer] = useState({})
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [options, setOptions] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  //const [userName,setUserName] = useState("")

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
        name: props.name
      }
      data.push(newRecord)
      LocalStorageRepo.save("Responses", data )

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
        showScore ? (
          <Result score={score} total={quizQuestions.length} options={options} name={userName} />
        ) : (


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
            {/* {quizQuestions[index].options.map((opt, i) => (
              <label key={i}>
                <input
                  id='radio-btn'
                  type="radio"
                  name={answer}
                  value={opt}
                  checked={answer === opt}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {opt}
                <br />
              </label>

            ))} */}
            <div className="buttons">
              <button className='btn-previous' onClick={previous} disabled={index == 0}  >Previous</button>

              {
                isSubmit ? (
                  <button className='btn-next' onClick={next} disabled={!options[index]}  > Submit</button>
                ) : (
                  <button className='btn-next' onClick={next} disabled={!options[index]}  > Next</button>

                )
              }
            </div>




          </div>
        )
      }

    </>
  )
}
export default Quiz;



