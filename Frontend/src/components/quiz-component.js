import { useState } from 'react'
import { quizQuestions } from './data'
import Result from './result'
import '../App.css'

function Quiz() {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [options, setOptions] = useState({})



  // const handleOptions = (index, answer) => {
  //   setOptions(prev => {
  //     const updated = { ...prev, [index]: answer };
  //     console.log("Updated Options:", updated);
  //     return updated;
  //   });
  // };

  const next = () => {
      console.log("index :" + index)
  console.log("answer :" + answer)
    //     const handleOptions = () => {
    //   setOptions(prev => ({ 
    //     ...prev,            // keep previous key-values
    //     [index]: answer     // set dynamic key using `index`
    //   }));
    // };
    if (answer === quizQuestions[index].answer) {
      setScore(score + 1)
      setAnswer("")
    }
    if (index < quizQuestions.length - 1) {
      setIndex(index + 1)

    } else {
      setShowScore(true)
    }
  }
  const previous = () => {
    //console.log(options)
    if (index <= quizQuestions.length - 1) {
      setIndex(index - 1)
    }
  }

  //  console.log(options)
  return (
    <>
      {
        showScore ? (
          <Result score={score} total={quizQuestions.length} />
        ) : (
          <div className="quiz-app" id="quiz-app">
            <h1>Quiz App</h1>
            <h3>Question NO {index + 1}: {quizQuestions[index].question}</h3>
            {quizQuestions[index].options.map((opt, i) => (
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

            ))}
            <button className='btn-previous' onClick={previous} disabled={index == 0}  >Previous</button>
            <button className='btn-next' onClick={next} disabled={answer === ""}  > Next</button>
          </div>
        )
      }

    </>
  )
}
export default Quiz;



