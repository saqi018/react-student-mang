import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from '../firebaseConfig'

const CreateStudent = ({getStudents}) => {

    const [name, setName] = useState('')
    const [rollNo, setRollNo] = useState('')
    const [age, setAge] = useState('')
    const [isCreatingStudent, setIsCreatingStudent] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsCreatingStudent(true)
            await addDoc(collection(db, 'students'), {
                rollNo: Number(rollNo),
                name: name,
                age: Number(age)
            })
            setName('')
            setRollNo('')
            setAge('')
            setIsCreatingStudent(false)
            await getStudents()
        } catch (error) {
            console.log('Error Creating Student Record: ', error);
            setIsCreatingStudent(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input type="number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Enter Roll Number" required />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" required />
                <button type="submit">{isCreatingStudent ? 'Creating...' : 'Create Student'}</button>
            </form>
        </div>
    )
}

export default CreateStudent