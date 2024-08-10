import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
export default function UpdateStudentDialog({ setStudents, editDialogOpen, currentStudent, setCurrentStudent, setEditDialogOpen }) {
    const [open, setOpen] = React.useState(true);
    const handleDialogClose = () => {
        setEditDialogOpen(false)
        setCurrentStudent(null)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentStudent((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSaveStudent = async ()=>{
        const studentDoc = doc(db, 'students', currentStudent.id)
        await updateDoc(studentDoc,{
            name: currentStudent.name,
            age: currentStudent.age
        })
        // setStudents((student)=>student.id === currentStudent.id ? currentStudent : student)
        handleDialogClose()
    }
    return (
        <Dialog
            open={editDialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Update Student</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    name='name'
                    label='Student Name'
                    type='text'
                    fullWidth
                    value={currentStudent?.name || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='age'
                    label='Student Age'
                    type='number'
                    fullWidth
                    value={currentStudent?.age || ''}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleSaveStudent} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    );
}