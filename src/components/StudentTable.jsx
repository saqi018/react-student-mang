import * as React from 'react';
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import students from '../App';
import setStudents from '../App';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebaseConfig';
import UpdateStudentDialog from './UpdateStudentDialog';

export default function StudentTable({ students }) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [currentStudent, setCurrentStudent] = React.useState(null)
    
  const studentId = students.id
  function handleUpdateStudent(studentId) {
  const student = students.find(s=>s.id === studentId)
  setCurrentStudent(student)
  setEditDialogOpen(true)
  }
  const handleDeleteStudent = async (studentId) => {
    try {
      const studentDoc = doc(db, 'students', studentId)
      await deleteDoc(studentDoc)
      setStudents(students.filter((student) => student.id !== studentId))
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }
  // const handleDialogClose = ()=>{
  //   setEditDialogOpen(false)
  // }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Roll No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{student.rollNo}</TableCell>
                <TableCell align="right">{student.name}</TableCell>
                <TableCell align="right">{student.age}</TableCell>
                <TableCell align="right">
                  {<EditIcon onClick={() => handleUpdateStudent(student.id)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }} />}
                  {<DeleteIcon onClick={() => handleDeleteStudent(student.id)} style={{ cursor: 'pointer', color: 'red' }} />
                  }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateStudentDialog setStudents = {setStudents} setEditDialogOpen = {setEditDialogOpen} setCurrentStudent= {setCurrentStudent} editDialogOpen={editDialogOpen} currentStudent = {currentStudent} />
    </>
  );
}