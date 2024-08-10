// import { useState, useEffect } from "react"
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";
import '../App.css'
import StudentTable from './StudentTable'

// console.log(students);
const StudentList = ({students}) => {

    return (
        <>
            <h1>Student List</h1>
            <div className="students-list" >
                {/* {students && students.map((student) => (
                    <div key={student.id} className="student">
                        <h2>{student.rollNo}</h2>
                        <h2>{student.name}</h2>
                        <p>Age: {student.age}</p>
                    </div>
                ))} */}
                <StudentTable students={students} />
            </div>
        </>
    )
}

export default StudentList