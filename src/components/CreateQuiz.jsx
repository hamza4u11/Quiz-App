// import React, { useState, useEffect } from 'react'
// import LocalStorageRepo from '../repo/localStorageRepo'
// import '../App.css'

// function CreateQuiz() {
//     const [quizName, setQuizName] = useState("")
//     const [countQuestion, setCountQuestion] = useState(0)
//     const [countOption, SetCountOption] = useState(0)
//     const [showQuiz, setShowQuiz] = useState(false)
//     // const [isCreate, setisCreate] = useState(false)
//     const [quizQuestions, setQuizQuestions] = useState([])
//     const [newQuiz, setNewQuiz] = useState([])


//     // useEffect(() => {
//     //     const getQuestions = LocalStorageRepo.get("Questions")
//     //     setQuizQuestions(getQuestions);
//     // }, []);
//     //console.log("I am from Local Storage ", quizQuestions)
//     const showQuizTrue = () => {
//         setShowQuiz(true)
//         // setisCreate(true)
//         if (showQuiz === true) {
//             setShowQuiz(!true)
//             setisCreate(!true)
//         }
//     }
//     const setQuestions = (qIndex, value) => {
//         // let update = [...newQuiz]
//         // // update[qIndex].questions = value
//         // setNewQuiz(update)
//     }
//     //    console.log(newQuiz)
//     const setOptions = (oIndex, value) => {


//     }
//     const answer = (qIndex, value) => {

//     }
//     return (
//         <>
//             <div className="create-quiz">
//                 <h1>Create Your Quiz</h1>
//                 <div className="form-group">
//                     <label htmlFor="quiz-name">Enter Quiz Name</label>
//                     <input type="text"
//                         name="quiz-name"
//                         id="quiz-name"
//                         placeholder="Enter Quiz Name"
//                         onChange={(e) => setQuizName(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="questions">Number of Questions</label>
//                     <input type="number"
//                         name="questions"
//                         id="questions"
//                         placeholder="Enter number of questions"
//                         onChange={(e) => setCountQuestion(Number(e.target.value))}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="options">Number of Options</label>
//                     <input type="number"
//                         name="options"
//                         id="options"
//                         placeholder="Enter number of options"
//                         onChange={(e) => SetCountOption(Number(e.target.value))}
//                     />
//                 </div>
//                 {
//                     showQuiz && [...Array(countQuestion)].map((q, qIndex) => (
//                         <div className="question-block" key={qIndex}>
//                             <input
//                                 type="text"
//                                 className="question-input"
//                                 // value={q.question}
//                                 placeholder={`Enter Question ${qIndex + 1}`}
//                                 onChange={(e) => setQuestions(qIndex, e.target.value)}

//                             />
//                             <div className="options">
//                                 {[...Array(countOption)].map((opt, oIndex) => (
//                                     <input
//                                         type="text"
//                                         className="option-input"
//                                         key={oIndex}
//                                         value={opt}
//                                         placeholder={`Option ${oIndex + 1}`}
//                                         onChange={(e) => setOptions(qIndex, oIndex, e.target.value)}
//                                     />
//                                 ))}
//                             </div>
//                             <input
//                                 type="text"
//                                 className="question-input"
//                                 // value={q.answer}
//                                 placeholder="Enter the correct Answer"
//                                 onChange={(e) => setAnswer(qIndex, e.target.value)}
//                             />
//                             <button className='generate-quiz-btn'>Add Quiz</button>
//                         </div>
//                     ))
//                 }
//                 <button className='generate-quiz-btn' onClick={showQuizTrue}  >Generate Quiz</button>
//                 {/* 
//                 {isCreate ? (<button className='generate-quiz-btn' onClick={showQuizTrue}  >Create Quiz</button>
//                 ) : (

//                 )
//                 } */}


//             </div>
//         </>
//     );
// }
// export default CreateQuiz;

import React, { useEffect, useState } from "react";
import LocalStorageRepo from "../repo/localStorageRepo";
import "../App.css";

function CreateQuiz() {
    const [quizName, setQuizName] = useState("");
    const [countQuestion, setCountQuestion] = useState(0);
    const [countOption, setCountOption] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    // Array of questions we're editing right now
    // shape: [{ question: "", options: ["", ...], answer: "" }, ...]
    const [draftQuestions, setDraftQuestions] = useState([]);

    // Previously saved quizzes (array of { name, questions })
    const [savedQuizzes, setSavedQuizzes] = useState([]);

    // Load existing quizzes (if any) on first mount
    useEffect(() => {
        const existing = LocalStorageRepo.get("Quizzes") || [];
        setSavedQuizzes(Array.isArray(existing) ? existing : []);
    }, []);

    // Build the empty draft when user clicks "Generate Quiz"
    const handleGenerateQuiz = () => {
        if (!quizName.trim()) {
            alert("Please enter a Quiz Name first.");
            return;
        }
        if (countQuestion <= 0) {
            alert("Please enter a valid number of questions.");
            return;
        }
        if (countOption <= 0) {
            alert("Please enter a valid number of options.");
            return;
        }

        // create a fresh skeleton based on counts
        const skeleton = Array.from({ length: countQuestion }, () => ({
            question: "",
            options: Array.from({ length: countOption }, () => ""),
            answer: "",
        }));

        setDraftQuestions(skeleton);
        setShowQuiz(true);
    };

    const setQuestionText = (qIndex, value) => {
        setDraftQuestions((prev) => {
            const next = [...prev];
            next[qIndex] = { ...next[qIndex], question: value };
            return next;
        });
    };

    const setOptionText = (qIndex, oIndex, value) => {
        setDraftQuestions((prev) => {
            const next = [...prev];
            const q = { ...next[qIndex] };
            const opts = [...q.options];
            opts[oIndex] = value;
            q.options = opts;
            next[qIndex] = q;
            return next;
        });
    };

    const setAnswerText = (qIndex, value) => {
        setDraftQuestions((prev) => {
            const next = [...prev];
            next[qIndex] = { ...next[qIndex], answer: value };
            return next;
        });
    };

    // Optional: ensure the answer matches one of the options exactly
    const validateAnswersAgainstOptions = () => {
        for (let i = 0; i < draftQuestions.length; i++) {
            const q = draftQuestions[i];
            if (!q.answer.trim()) return `Question ${i + 1}: answer is empty`;
            const matchesAny = q.options.some(
                (opt) => opt.trim() && opt.trim() === q.answer.trim()
            );
            if (!matchesAny) {
                return `Question ${i + 1}: answer must match one of its options`;
            }
        }
        return null;
    };

    // Basic validation before saving
    const validateBeforeSave = () => {
        if (!quizName.trim()) return "Quiz name is required.";

        for (let i = 0; i < draftQuestions.length; i++) {
            const q = draftQuestions[i];x
            if (!q.question.trim()) {
                return `Question ${i + 1}: question text is required.`;
            }
            for (let j = 0; j < q.options.length; j++) {
                if (!q.options[j].trim()) {
                    return `Question ${i + 1}: option ${j + 1} is empty.`;
                }
            }
            if (!q.answer.trim()) {
                return `Question ${i + 1}: answer is required.`;
            }
        }

        // If you want strict matching between answer and options, enable this:
        const strictError = validateAnswersAgainstOptions();
        if (strictError) return strictError;

        return null;
    };

    const handleSaveQuiz = () => {
        const error = validateBeforeSave();
        if (error) {
            alert(error);
            return;
        }

        const newQuiz = {
            name: quizName.trim(),
            questions: draftQuestions.map((q) => ({
                question: q.question.trim(),
                options: q.options.map((o) => o.trim()),
                answer: q.answer.trim(),
            })),
            createdAt: new Date().toISOString(),
        };

        const updated = [...savedQuizzes, newQuiz];
        LocalStorageRepo.save("Quizzes", updated);
        setSavedQuizzes(updated);

        // Reset UI
        setQuizName("");
        setCountQuestion(0);
        setCountOption(0);
        setDraftQuestions([]);
        setShowQuiz(false);

        alert("Quiz saved successfully!");
    };

    // If you want to let users discard and rebuild the draft
    const handleResetDraft = () => {
        setDraftQuestions([]);
        setShowQuiz(false);
    };

    return (
        <>
            <div className="create-quiz">
                <h1>Create Your Quiz</h1>

                <div className="form-group">
                    <label htmlFor="quiz-name">Enter Quiz Name</label>
                    <input
                        type="text"
                        name="quiz-name"
                        id="quiz-name"
                        placeholder="Enter Quiz Name"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="questions">Number of Questions</label>
                    <input
                        type="number"
                        name="questions"
                        id="questions"
                        min={0}
                        placeholder="Enter number of questions"
                        value={countQuestion || ""}
                        onChange={(e) => setCountQuestion(Number(e.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="options">Number of Options</label>
                    <input
                        type="number"
                        name="options"
                        id="options"
                        min={0} 
                        placeholder="Enter number of options"
                        value={countOption || ""}
                        onChange={(e) => setCountOption(Number(e.target.value))}
                    />
                </div>

                <div className="actions" style={{ display: "flex", gap: 8 }}>
                    <button className="generate-quiz-btn" onClick={handleGenerateQuiz}>
                        Generate Quiz
                    </button>
                    {showQuiz && (
                        <>
                            <button className="generate-quiz-btn" onClick={handleSaveQuiz}>
                                Save Quiz
                            </button>
                            <button className="generate-quiz-btn" onClick={handleResetDraft}>
                                Reset
                            </button>
                        </>
                    )}
                </div>

                {showQuiz &&
                    draftQuestions.map((q, qIndex) => (
                        <div className="question-block" key={qIndex}>
                            <input
                                type="text"
                                className="question-input"
                                value={q.question}
                                placeholder={`Enter Question ${qIndex + 1}`}
                                onChange={(e) => setQuestionText(qIndex, e.target.value)}
                            />

                            <div className="options">
                                {q.options.map((opt, oIndex) => (
                                    <input
                                        type="text"
                                        className="option-input"
                                        key={oIndex}
                                        value={opt}
                                        placeholder={`Option ${oIndex + 1}`}
                                        onChange={(e) =>
                                            setOptionText(qIndex, oIndex, e.target.value)
                                        }
                                    />
                                ))}
                            </div>

                            <input
                                type="text"
                                className="question-input"
                                value={q.answer}
                                placeholder="Enter the correct Answer (must match an option)"
                                onChange={(e) => setAnswerText(qIndex, e.target.value)}
                            />
                        </div>
                    ))}

                {/* (Optional) tiny list of what’s already saved */}
                {/* {savedQuizzes.length > 0 && (
                    <div style={{ marginTop: 24 }}>
                        <h3>Saved Quizzes</h3>
                        <ul>
                            {savedQuizzes.map((qz, i) => (
                                <li key={i}>
                                    <strong>{qz.name}</strong> — {qz.questions.length} questions
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>
        </>
    );
}

export default CreateQuiz;
