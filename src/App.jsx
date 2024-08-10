import { useState, useEffect } from "react"
import { db } from "./firebaseConfig";
import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'
import './App.css'
import { collection, getDocs } from "firebase/firestore";
function App() {

  const [students, setStudents] = useState([])
  const studentsCollection = collection(db, 'students')
  const getStudents = async () => {
    const studentSnapshot = await getDocs(studentsCollection)
    const studentList = studentSnapshot.docs.map(doc => (
      {

        id: doc.id,
        ...doc.data()
      }
    ))
    setStudents(studentList)
  }
  useEffect(() => {
    getStudents();
  }, [students]);


  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Student Management System</h1>
      <CreateStudent getStudents={getStudents} />
      <StudentList students={students} setStudents = {setStudents} />
    </div>
  )
}

export default App