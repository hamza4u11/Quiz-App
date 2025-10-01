import React from 'react';
import LocalStorageRepo from '../repo/localStorageRepo';
import { quizQuestions } from './data'



function AllResults() {
    const getResults = LocalStorageRepo.get("Responses")
    // console.log(getResults)
    return (
        <div className="all-results">
            <h1>All Results </h1>
            <div className="" style={{ width: "auto ", margin: "auto", padding: "20px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Question NO 1</th>
                            <th>Question NO 2</th>
                            <th>Question NO 3</th>
                            <th>Question NO 4</th>
                            <th>Question NO 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getResults.map((res, i) => (
                            <tr key={i}>
                                <td >{i + 1}</td>
                                <td>{res.name} </td>
                                <td>Answer:  <b>{res[0]}{res[0] == quizQuestions[0].answer ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; </span>}</b></td>
                                <td>Answer:  <b>{res[1]}{res[1] == quizQuestions[1].answer ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; </span>}</b></td>
                                <td>Answer:  <b>{res[2]} {res[2] == quizQuestions[2].answer ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; </span>}</b></td>
                                <td>Answer: <b>{res[3]}{res[3] == quizQuestions[3].answer ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; </span>}</b></td>
                                <td>Answer: <b>{res[4]}{res[4] == quizQuestions[4].answer ? <span> &nbsp; &#9989;</span> : <span> &nbsp; &#10060; </span>}</b></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AllResults;